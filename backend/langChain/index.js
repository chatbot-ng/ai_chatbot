// import OpenAI from "langchain/llms/openai";
const { ChatOpenAI } = require ("langchain/chat_models/openai");
const { HumanMessage, ChatMessage, SystemMessage, AIMessage } = require("langchain/schema");
const { BufferMemory, ChatMessageHistory } =require("langchain/memory");
const {ConversationChain} = require("langchain/chains");
const chat = new ChatOpenAI({
    temperature: 0,
  });
const memory = new BufferMemory({
    chatHistory: new ChatMessageHistory([new AIMessage('Ask me a question')])
});
// const createLangChain = 0
const createLangChain = async () => {
    const chains = new ConversationChain({
        llm: chat,
        memory
    })
    return chains;
}
const reply = async (message,chains) => {
    try{const reply = await chains.call({input:message});    
    return reply;}
    catch(e){console.log(e);return null;}
}

module.exports = {reply,createLangChain};