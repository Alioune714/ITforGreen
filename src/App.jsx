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
import VerifyEmailNotice from './pages/VerifyEmailNotice';
import TwoFactorChallenge from './pages/TwoFactorChallenge';
import Enable2FA from './pages/Enable2FA';

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
          {/* Email non vérifié ? Affiche un message */}
          <Route path="/verify-email" element={<VerifyEmailNotice />} />

          {/* 🔐 Ces routes nécessitent une authentification */}
          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/recommandations" element={<Recommendations />} />
              <Route path="/formation/:id" element={<FormationDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/2fa" element={<TwoFactorChallenge />} />
              <Route path="/2fa/setup" element={<Enable2FA />} />
            </>
          ) : (
            // 🔁 Si pas connecté → redirige vers login
            <>
              <Route path="/dashboard" element={<Navigate to="/login" />} />
              <Route path="/landing" element={<Navigate to="/login" />} />
              <Route path="/recommandations" element={<Navigate to="/login" />} />
              <Route path="/formation/:id" element={<Navigate to="/login" />} />
              <Route path="/about" element={<Navigate to="/login" />} />
              <Route path="/profile" element={<Navigate to="/login" />} />
              <Route path="/2fa" element={<Navigate to="/login" />} />
              <Route path="/2fa/setup" element={<Navigate to="/login" />} />
            </>
          )}
        </Route>

        {/* ❓ Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
