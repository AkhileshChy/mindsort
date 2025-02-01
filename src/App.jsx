import React from 'react'
import Questionaire from './pages/Questionaire'
import { Route, Routes } from 'react-router-dom'
import ChatBot from './pages/ChatBot'

const App = () => {
  return (
    <Routes>
      <Route path='/questions' element={<Questionaire />} />
      <Route path='/chatbot' element={<ChatBot />} />
    </Routes>
  )
}

export default App
