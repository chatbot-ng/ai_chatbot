import { OpenAI } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ConversationalRetrievalQAChain, LLMChain} from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";
import { MongoDBAtlasVectorSearch }  from "@langchain/mongodb";
import {MongoClient} from 'mongodb'
import {MONGODB_ATLAS_VECTOR_URI, OPENAI_API_KEY} from '../config/config.js'
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";
import { AIMessage } from "@langchain/core/messages";
const chat = new ChatOpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    streaming: true,
    openAIApiKey:OPENAI_API_KEY
    // verbose: true,
  });
const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    openAIApiKey:OPENAI_API_KEY
  })
const memoryStorage = {
     pushMemory: function(id){
        this[id] = new BufferMemory({
            chatHistory: new ChatMessageHistory([new AIMessage('Ask me a question')])
        });
        setTimeout(
            ()=>{
            delete this[id]
        },600000)
    }
}
async function loadPDF(){
    const loader = new PDFLoader('./langChain/Chetan Nagre-2.pdf')
    const pages = await loader.load()
    const text_splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 80,
        separators: ["\n\n","\n","(?<=\.)"," ",""]
    })
    const docs = await text_splitter.splitDocuments(pages)
    const vectorstore = await MemoryVectorStore.fromDocuments(docs,new OpenAIEmbeddings)
    return vectorstore
}

// const vectorstore = await loadPDF()
async function connectVectoreStore(collection){
    const vectorstore = new MongoDBAtlasVectorSearch(new OpenAIEmbeddings,{
        collection
    })
    return vectorstore
}

const client = new MongoClient(MONGODB_ATLAS_VECTOR_URI || "");
const namespace = "vectoreStore.new";
const [dbName, collectionName] = namespace.split(".");
const collection = client.db(dbName).collection(collectionName);

const vectorstore = await connectVectoreStore(collection)


const retriever = vectorstore.asRetriever({
    // searchType: "mmr",
    searchKwargs: {
      fetchK: 2,
      lambda: 0.1,
    },
  })


export const reply = async (message,id,res) => {
    try{
        if(memoryStorage[id]===undefined){
            memoryStorage.pushMemory(id)
        }
        const qa =  ConversationalRetrievalQAChain.fromLLM(chat,retriever)
        const reply = await qa.call({'question': message,"chat_history":memoryStorage[id]},[
            {
                handleLLMNewToken(token) {
                    res.write('event: message\n');
                    res.write(`data: ${token}`);
                    res.write('\n\n');
                },
            }
        ]); 
        res.write('event: close\n');
        res.write(`data: { "time": ${Date.now()} }`);
        res.write('\n\n');    
        return reply;
    }
    catch(e){console.log(e);return null;}
}

const prompt =  PromptTemplate.fromTemplate(`
    You are a working professional at a company. Your name is Chetan Nagre. Your task is to help user with the question they ask about you.
    For answering the question, you need to use the following information:
    {context}
    
    Answer the following question asked by the user in friendly and professional language:
    {input}
`)

const chain = RunnableSequence.from([
    {
        input: new RunnablePassthrough(),
        context: retriever.pipe(formatDocumentsAsString),
    },
    prompt,
    model,
]);

// const chain = prompt.pipe(chat)

export const pipe = async (message,id,res) => {
    try{
        if(memoryStorage[id]===undefined){
            memoryStorage.pushMemory(id)
        }
        const reply = await chain.stream(message)
        
        for await (const token of reply){
            res.write('event: message\n');
            res.write(`data: ${token}`);
            res.write('\n\n');
        }

        res.write('event: close\n');
        res.write(`data: { "time": ${Date.now()} }`);
        res.write('\n\n');    
        res.end()
        return reply;
    }
    catch(e){
        console.log(e);return null;}
}
export const testingPrompt = async (question,sentence1,sentence2)=>{
    try{
        const prompt = new PromptTemplate({
            template: "You are an average human. You have been given a question and it's accepted answer and a sentence. Your task is to determine whether the given sentence may also be used as the question's answer. Strictly give answer in 'Yes' or 'No'.\n Question: {question} \n Accepted answer: {answer} \n Sentence: {sentence}.",
            inputVariables : ['question','answer','sentence']
        })

        const chain = new LLMChain({
            llm: model,
            prompt
        }) 
        return await chain.call({
            question,
            answer : sentence1,
            sentence : sentence2,
        })
    }catch(e){
        console.log(e);
        return null;
    }
}
export default {reply,loadPDF, testingPrompt,pipe};
