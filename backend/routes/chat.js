
import { Router } from 'express';
import { sendReply } from '../controllers/chat.js';

const chatRouter = Router();

// chatRouter.get('/reply', test ); 
chatRouter.post('/reply', sendReply); 

// chatRouter.post('/connect', createChain);
// chatRouter.get('/', );

export default chatRouter;