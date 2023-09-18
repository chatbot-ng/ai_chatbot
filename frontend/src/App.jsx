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
    <>
    <Chat/>
    <div>
      <form onSubmit={submitFile} className='mt-10'>
        <input type='file' />
        <input className='border-2 p-2 border-black' type='submit' />
      </form>
    </div>
    </>
  )
}

export default App
