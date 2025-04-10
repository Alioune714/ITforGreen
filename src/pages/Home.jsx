import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="font-sans bg-gradient-to-b from-green-50 via-white to-green-100 min-h-screen">
      {/* Navbar harmonisée */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b border-green-100">
        <h1 className="text-2xl font-bold text-green-700 tracking-tight">EduBot</h1>
        <div className="space-x-6 text-sm font-medium">
          <Link to="/" className="text-gray-700 hover:text-green-700 transition duration-300">À propos</Link>
          <Link to="/login" className="text-blue-600 hover:text-blue-800 transition duration-300">Se connecter</Link>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Bienvenue sur <span className="text-green-700">EduBot 🌱</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8">
          Un assistant intelligent pour choisir les meilleures formations tout en évaluant votre impact écologique.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-full text-base font-semibold shadow hover:bg-blue-700 transition duration-300"
          >
            Se connecter
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-green-600 text-white rounded-full text-base font-semibold shadow hover:bg-green-700 transition duration-300"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}
