import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Layout avec Navbar et Footer
import Home from './pages/Home'; // Page d'accueil sans layout
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import FormationDetail from './pages/FormationDetail';
import About from './pages/About'; // Importer la page About
import LandingPage from './pages/LandingPage';
import UserProfile from './pages/UserProfile';


function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Page d'accueil SANS Layout */}
        <Route path="/" element={<Home />} />

        {/* ✅ Toutes les autres pages AVEC Layout */}
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/recommandations" element={<Recommendations />} />
          <Route path="/formation/:id" element={<FormationDetail />} />
          <Route path="/about" element={<About />} /> {/* Ajout de la route À propos */}
          <Route path="/profile" element={<UserProfile />} />

          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
