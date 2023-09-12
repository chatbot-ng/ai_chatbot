
const express = require('express');
const { sendReply } = require('../controllers/chat.js');

const chatRouter = express.Router();

chatRouter.post('/reply', sendReply); 
// chatRouter.post('/connect', createChain);
// chatRouter.get('/', );

module.exports = chatRouter;