import { useSelector } from 'react-redux'
import {useEffect} from 'react'
import Chat from './Chatting/Chat'
import { connectAIBot } from './Redux/action'
function App() {
  const {user} = useSelector(state => state.user)
  useEffect(() => {
    // connectAIBot()
  })
  return (
    <>
    <Chat/>
    </>
  )
}

export default App
