
import { Router } from 'express';
import { sendReply ,testing} from '../controllers/chat.js';

const chatRouter = Router();

// chatRouter.get('/reply', test ); 
// chatRouter.post('/reply', sendReply); 
chatRouter.get('/reply', sendReply); 
chatRouter.post('/test', testing ); 
// chatRouter.post('/connect', createChain);
// chatRouter.get('/', );

export default chatRouter;