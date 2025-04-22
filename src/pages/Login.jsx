import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!isEmailValid(formData.email)) {
      setMessage("Adresse email invalide.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email: formData.email,
        password: formData.password,
      });

      const token = response.data.access_token;
      localStorage.setItem("auth_token", token);
      setMessage("Connexion réussie ✅");

      navigate("/landing");

    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || "Email ou mot de passe incorrect.");
      } else {
        setMessage("Erreur de connexion à l’API.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0fdf4", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        maxWidth: "400px",
        width: "100%"
      }}>
        <h2 style={{ textAlign: "center", fontSize: "1.8rem", marginBottom: "1rem", color: "#16a34a" }}>
          Connexion 🌱
        </h2>
        {message && (
          <p style={{ color: message.includes("réussie") ? "#16a34a" : "#dc2626", textAlign: "center", marginBottom: "1rem" }}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="email"
            name="email"
            placeholder="Adresse e-mail"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <button type="submit" disabled={loading} style={{
            background: loading ? "#9ca3af" : "#16a34a",
            color: "#fff",
            padding: "0.8rem",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer"
          }}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Mot de passe oublié ?{" "}
          <Link to="/forgot-password" style={{ color: "#16a34a", textDecoration: "underline" }}>
            Cliquez ici
          </Link>
        </p>
        <p style={{ marginTop: "0.5rem", textAlign: "center" }}>
          Pas encore inscrit ?{" "}
          <Link to="/register" style={{ color: "#16a34a", textDecoration: "underline" }}>
            Crée un compte
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
