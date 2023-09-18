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

    const id = req.session.memory
    const data = await reply(message,id)
    res.send({
        data
    })
}



module.exports = {
    sendReply,
    // createChain
}