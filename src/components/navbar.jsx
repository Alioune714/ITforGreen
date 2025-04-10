import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";  // Importation de l'icône du profil

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-green-700">Edubot</div>
      <ul className="flex space-x-6 text-sm font-medium text-gray-700">
        <li><Link to="/landing" className="hover:text-green-700">Accueil</Link></li>
        <li><Link to="/about" className="hover:text-green-700">À propos</Link></li>
        <li><Link to="/recommandations" className="hover:text-green-700">Formations</Link></li>
        <li><Link to="/login" className="hover:text-green-700">Deconnexion</Link></li>
        {/* Icône de profil avec lien vers la page UserProfile */}
        <li>
          <Link to="/Profile" className="hover:text-green-700">
            <FaUser className="text-lg" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
