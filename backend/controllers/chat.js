import { reply } from '../langChain/index.js'


export const sendReply = async (req, res) => {
    const {message} = req.body

    const id = req.session.memory
    const data = await reply(message,id)
    res.send({
        data
    })
}

// export const test = async (req, res) => {
//     const data = await loadPDF()
//     res.send({
//         data
//     })
// }


// export default {
//     sendReply,
//     test
// }