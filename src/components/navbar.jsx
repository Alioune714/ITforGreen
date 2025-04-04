import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
      <div className="text-xl font-bold text-blue-600 flex items-center">
        📖 EDUFORM
      </div>
      <div className="space-x-6">
        <Link to="/formations" className="text-gray-700 hover:text-blue-600">
          Formations
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600">
          À propos
        </Link>
        <Link to="/login" className="text-blue-600 font-semibold">
          Connexion
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
