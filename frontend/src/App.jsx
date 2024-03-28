import { useSelector } from 'react-redux'
import Chat from './Chatting/Chat'
import { Route, Routes } from 'react-router-dom'
function App() {
  const {user} = useSelector(state => state.user)
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Chat/>}/>
      </Routes>
    </div>
  )
}

export default App
