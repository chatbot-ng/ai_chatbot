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
        <div className="fixed bottom-5 w-[calc(100vw-3rem)]">
            <div className="flex justify-center sm:px-40 ">
                <input type="" value={chatbox} name='chatbox' onChange={changeChatBox} onKeyUp={(e)=>e.key==='Enter'&&sendMessage()} placeholder="Ask me a question!" className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md p-2 flex-grow" />
                <button type='button' onClick={sendMessage} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 p-2">Send</button>
            </div>
        </div>
    </>
} 