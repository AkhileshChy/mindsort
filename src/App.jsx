import React from 'react'
import Questionaire from './pages/Questionaire'
import { Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome'
import ChatBot from './pages/ChatBot'
import HomePage from './pages/HomePage'
import Dashboard from './pages/DashBoard'
import TherapyCards from './pages/TherapyCards'
// import HomePage from './pages/HomePage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/therapycards' element={<TherapyCards />} />
      <Route path='/welcome' element={<Welcome />} />
      <Route path='/questions' element={<Questionaire />} />
      <Route path='/chatbot' element={<ChatBot />} />
    </Routes>
  )
}

export default App
