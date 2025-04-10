import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Layout avec Navbar et Footer
import Home from './pages/Home'; // Page d'accueil sans layout
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import FormationDetail from './pages/FormationDetail';
import About from './pages/About';
import LandingPage from './pages/LandingPage'; // si tu veux le garder

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
          <Route path="/recommandations" element={<Recommendations />} />
          <Route path="/formation/:id" element={<FormationDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/landing" element={<LandingPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
