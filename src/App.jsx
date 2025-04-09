import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Recommendations from './pages/Recommendations'
import FormationDetail from './pages/FormationDetail'
import LandingPage from './pages/LandingPage'
import React from 'react';
import Chatbot from './components/ChatbotBubble';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recommandations" element={<Recommendations />} />
        <Route path="/formation/:id" element={<FormationDetail />} />
        <Route path="/LandingPage/:id" element={<LandingPage />} />
      </Routes>
    </Router>
  )
}

export default App
