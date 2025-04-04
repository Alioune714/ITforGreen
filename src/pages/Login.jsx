import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données de connexion :", formData);
    // Ici, on enverra les infos à l'API Laravel
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Connexion</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Adresse e-mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Connexion
          </button>
        </form>
        <p className="mt-4 text-center">
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Mot de passe oublié ?
          </a>
        </p>
        <p className="mt-4 text-center">
          Vous n'avez pas de compte ?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Inscrivez-vous
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
