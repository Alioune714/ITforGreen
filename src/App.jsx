import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Importer le Layout (avec Navbar et Footer)
import LandingPage from './pages/LandingPage'; // Importer LandingPage
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import FormationDetail from './pages/FormationDetail';
import About from './pages/About'; // Importer la page About

function App() {
  return (
    <Router>
      <Routes>
        {/* Enveloppe toutes les routes avec le Layout */}
        <Route path="/" element={<Layout />} >
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recommandations" element={<Recommendations />} />
          <Route path="/formation/:id" element={<FormationDetail />} />
          <Route path="/about" element={<About />} /> {/* Ajout de la route À propos */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
