import {OpenAI} from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, ChatMessage, SystemMessage, AIMessage } from "langchain/schema";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextSplitter, RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Chroma } from 'langchain/vectorstores/chroma';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import {ContextualCompressionRetriever} from 'langchain/retrievers/contextual_compression'
import {LLMChainExtractor} from 'langchain/retrievers/document_compressors/chain_extract'
import {RetrievalQAChain, ConversationalRetrievalQAChain} from "langchain/chains"
// const createLangChain = 0
const chat = new ChatOpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo'
  });
const model = new OpenAI()
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
    const loader = new PDFLoader('/home/sanket/Gits/new_folder/ai_chatbot/backend/langChain/Chetan Nagre-2.pdf')
    const pages = await loader.load()
    const text_splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 40,
        separators: ["\n\n","\n","(?<=\.)"," ",""]
    })
    const docs = await text_splitter.splitDocuments(pages)
    const vectorstore = await MemoryVectorStore.fromDocuments(docs,new OpenAIEmbeddings)
    // console.log(vectorstore.memoryVectors)
    // const retriever = new ContextualCompressionRetriever({
    //     baseCompressor: LLMChainExtractor.fromLLM(model),
    //     baseRetriever: vectorstore.asRetriever({
    //         // searchType: 'mmr'
    //     })
    // })

    // const data = await retriever._getRelevantDocuments('What languages do he speak?')
    // return data[0].pageContent
    return vectorstore
}
export const reply = async (message,id) => {
    try{
        if(memoryStorage[id]===undefined){
            memoryStorage.pushMemory(id)
        }
        const qa =  ConversationalRetrievalQAChain.fromLLM(chat,vectorstore.asRetriever())
        const reply = await qa.call({'question': message,"chat_history":memoryStorage[id]});    
        return reply;
    }
    catch(e){console.log(e);return null;}
}

export default {reply,loadPDF};