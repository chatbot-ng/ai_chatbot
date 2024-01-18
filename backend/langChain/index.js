import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { AIMessage } from "langchain/schema";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { ConversationalRetrievalQAChain, LLMChain,ConversationChain} from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

const chat = new ChatOpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    streaming: true,
  });
const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo'
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
const vectorstore = await loadPDF()
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
const chains = new ConversationChain({
    llm: chat,
    // memory
})

export const reply = async (message,id,res) => {
    try{
        if(memoryStorage[id]===undefined){
            memoryStorage.pushMemory(id)
        }
        const qa =  ConversationalRetrievalQAChain.fromLLM(chat,vectorstore.asRetriever())
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
export default {reply,loadPDF, testingPrompt};
