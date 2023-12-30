import { useSelector } from 'react-redux'
import {useEffect, useState} from 'react'
import Chat from './Chatting/Chat'
function App() {
  const {user} = useSelector(state => state.user)
  const [file,setFile] = useState()
  useEffect(() => {
  })
  function submitFile(e){
    e.preventDefault()
    new FileReader()
  }
  return (
    <div className=''>
      <Chat/>
    </div>
  )
}

export default App
