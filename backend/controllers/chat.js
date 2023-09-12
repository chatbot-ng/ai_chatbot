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

const sendReply = (req, res) => {
    const {message} = req.body
    // console.log(req.session.chain,typeof req.session.chain)
    // if(req.session.chain===undefined){
    //     console.log('new')
    //     const data = await createLangChain()
    //     req.session.chain=0
    // }else{
        req.session.chain++
    // }
    // const chain = req.session.chain
    console.log(req.session.chain)
    // const data = await reply(message,chain)
    res.send({
        message: req.session.chain
    })
}



module.exports = {
    sendReply,
    // createChain
}