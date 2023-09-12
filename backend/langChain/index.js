// import OpenAI from "langchain/llms/openai";
const { ChatOpenAI } = require ("langchain/chat_models/openai");
const { HumanMessage, ChatMessage, SystemMessage, AIMessage } = require("langchain/schema");
const { BufferMemory, ChatMessageHistory } =require("langchain/memory");
const {ConversationChain} = require("langchain/chains");
// const createLangChain = 0
const chat = new ChatOpenAI({
    temperature: 0,
  });
  const initial_memory = new BufferMemory({
      chatHistory: new ChatMessageHistory([new AIMessage('Ask me a question')])
  });
const createLangChain = async (memory=initial_memory) => {
    const new_Memory = new BufferMemory(memory)
    return new_Memory
}
const reply = async (message,memory) => {
    console.log(typeof chains)
    try{
        const chains = new ConversationChain({
            llm: chat,
            memory
        })
        const reply = await chains.call({input:message});    
        return reply;
    }
    catch(e){console.log(e);return null;}
}

module.exports = {reply,createLangChain};