const {reply,createLangChain} = require('../langChain/index.js')

// const createChain = async(req, res) => {
//     try{const data = await createLangChain()
//     req.session.chain = data
//     console.log(typeof chain)
//     res.send({
//         message: 'Created'
//     })}
//     catch(err){
//             res.send({
//                 message: err
//             })
//         }
// }

const sendReply = async (req, res) => {
    const {message} = req.body
    if(req.session.memory===undefined){
        const memory = await createLangChain()
        req.session.memory={memory}
    }
    const memory = req.session.memory
    req.session.memory = await createLangChain(memory)
    console.log(memory)
    // const data = await reply(message,memory)
    res.send({
        // data,
        memory
    })
}



module.exports = {
    sendReply,
    // createChain
}