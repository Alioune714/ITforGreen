import { Link } from 'react-router-dom'
import Navbar from "../components/navbar";
export default function Home() {
  return (
    <div>
    <Navbar /> {/* Ajout de la Navbar */}
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">

      <h1 className="text-4xl font-bold mb-4">Bienvenue sur ChatBot E-Learning 🌱</h1>
      <p className="text-gray-700 max-w-xl mb-6">
        Un assistant intelligent pour vous aider à choisir les meilleures formations
        tout en suivant votre impact écologique.
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Se connecter
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
        >
          S'inscrire
        </Link>
      </div>
    </div>
    </div>
  )
}
