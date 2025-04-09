import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Importer le Layout (avec Navbar et Footer)
import LandingPage from './pages/LandingPage'; // Importer LandingPage
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import FormationDetail from './pages/FormationDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recommandations" element={<Recommendations />} />
        <Route path="/formation/:id" element={<FormationDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
