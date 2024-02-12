import { reply , testingPrompt} from '../langChain/index.js'
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function prepStream(res) {
    if (!res) {
        return;
    }

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.setHeader('Transfer-Encoding', 'chunked')
    res.flushHeaders();

    res.on('close', () => {
        res.end();
    });
}

export const sendReply = async (req, res) => {
    prepStream(res)
    const {message} = req.query
    const id = req.session.memory
    const data = await reply(message,id,res)
}

// export const test = async (req, res) => {
//     const data = await loadPDF()
//     res.send({
//         data
//     })
// }

export const testing = async (req, res) => {
    try{
        const {question,answer,response}  = req.body
        const abc = await testingPrompt(question,answer,response) 
        if(abc?.text.includes("Yes")){
            return res.send({
                text : "Yes"
            })
        }else{
            return res.status(201).send({
                text : "No"
            })
        }
    }
    catch(e){
        res.status(500).send({
            error: e.message
        })
    }
    return
}

export const get_webhook = async (req, res) => {
    if (
        req.query['hub.mode'] == 'subscribe' &&
        req.query['hub.verify_token'] == process.env.WHATSAPP_VERIFY_TOKEN
    ) {
        res.send(req.query['hub.challenge']);
    } else {
        res.sendStatus(400);
    }
    return
}

export const post_webhook = async (req, res) => {
    console.log(JSON.stringify(req.body))
    res.send({
        message: "Hello"
    })
    return
}
// export default {
//     sendReply,
//     test
// }