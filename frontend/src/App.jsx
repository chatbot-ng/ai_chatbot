import { useSelector } from 'react-redux'
import {useEffect, useState} from 'react'
import Chat from './Chatting/Chat'
import { Route, Routes } from 'react-router-dom'
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
      <Routes>
        <Route path='/' element={<Chat location='/'/>}/>
        <Route path='/pipe' element={<Chat location='/pipe' />}/>
      </Routes>
    </div>
  )
}

export default App
