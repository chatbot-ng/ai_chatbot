// import OpenAI from "langchain/llms/openai";
const { ChatOpenAI } = require ("langchain/chat_models/openai");
const { HumanMessage, ChatMessage, SystemMessage, AIMessage } = require("langchain/schema");
const { BufferMemory, ChatMessageHistory } =require("langchain/memory");
const {ConversationChain} = require("langchain/chains");
// const createLangChain = 0
const chat = new ChatOpenAI({
    temperature: 0,
  });

const memoryStorage = {
     pushMemory: function(id){
        this[id] = new BufferMemory({
            chatHistory: new ChatMessageHistory([new AIMessage('Ask me a question')])
        });
        setTimeout(
            ()=>{
            delete this[id]
        },60000)
    }
}
const reply = async (message,id) => {
    try{
        if(memoryStorage[id]===undefined){
            memoryStorage.pushMemory(id)
        }
        const chains = new ConversationChain({
            llm: chat,
            memory:memoryStorage[id]
        })
        const reply = await chains.call({input:message});    
        return reply;
    }
    catch(e){console.log(e);return null;}
}

module.exports = {reply};