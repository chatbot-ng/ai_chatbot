
import { Router } from 'express';
import { get_webhook, sendReply ,testing,post_webhook} from '../controllers/chat.js';

const chatRouter = Router();
 
chatRouter.get('/reply', sendReply);  
chatRouter.post('/test', testing ); 
chatRouter.get('/webhook',get_webhook)
chatRouter.post('/webhook',post_webhook)
export default chatRouter;