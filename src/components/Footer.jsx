// src/components/Footer.jsx
import { Link } from 'react-router-dom';  // Importation de Link

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white px-6 py-12 mt-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-xl mb-2">🌿 Edubot</h3>
          <p className="text-sm text-green-100">
            La première plateforme de formation en ligne qui intègre l'impact environnemental à votre parcours d'apprentissage.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Navigation</h4>
          <ul className="space-y-1 text-sm text-green-100">
            <li><Link to="/recommandations" className="hover:underline">Formations</Link></li>
            <li><Link to="/about" className="hover:underline">À propos</Link></li>
            <li><Link to="/blog" className="hover:underline">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm text-green-100">✉️ contact@edubot.com</p>
          <p className="text-sm text-green-100">📍 Paris, France</p>
        </div>
      </div>
      <div className="text-center text-green-200 text-xs mt-8">
        © 2025 Edubot. Tous droits réservés.
      </div>
    </footer>
  );
}
