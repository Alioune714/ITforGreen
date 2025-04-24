import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import FormationDetail from './pages/FormationDetail';
import About from './pages/About';
import LandingPage from './pages/LandingPage';
import UserProfile from './pages/UserProfile';
import ChatbotBubble from './pages/ChatbotBubble';

// 🔐 Exemple d’auth simple (tu peux l’améliorer avec context)
const isAuthenticated = !!localStorage.getItem('token');

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔓 Pages publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 Routes avec layout et sécurité */}
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/recommandations" element={<Recommendations />} />
          <Route path="/formation/:id" element={<FormationDetail />} />
          <Route path="/about" element={<About />} /> {/* Ajout de la route À propos */}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/chatbot" element={<ChatbotBubble />} />

          
        </Route>

        {/* ❓ Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
