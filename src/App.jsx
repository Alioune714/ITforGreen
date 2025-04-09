import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import FormationDetail from './pages/FormationDetail';
import UserProfile from './pages/UserProfile';
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
        <Route path="/User/:id" element={<FormationDetail />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
