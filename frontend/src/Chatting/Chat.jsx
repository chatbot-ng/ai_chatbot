import { useSelector,useDispatch } from "react-redux"
import DisplayChat from "./DisplayChat"
import { useState} from "react"
import { sendMessageAction ,getMessageAction} from "../Redux/action"
export default function (){
    const [chatbox, setChatbox] = useState('')
    const dispatch = useDispatch()
    function changeChatBox(e) {
        if(e.keyCode === 'Enter'){
            console.log(e.target.value)
            sendMessage()
        }
        setChatbox(e.target.value)
    }
    function sendMessage() {
        if(chatbox.trim()!== ''){
            dispatch(sendMessageAction(chatbox))
            dispatch(getMessageAction(chatbox))
            setChatbox('')
        }
    }

    return <>
        <DisplayChat  />
        <input type="" value={chatbox} name='chatbox' onChange={changeChatBox} onKeyUp={(e)=>e.key==='Enter'&&sendMessage()} className="border-2 rounded-sm border-black p-2" />
        <button type='button' onClick={sendMessage} className="border-2 border-black p-2">Send</button>
    </>
} 