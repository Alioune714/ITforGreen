import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setMessage("Inscription réussie ✅");

      // Redirection possible après inscription
      // window.location.href = "/dashboard";

    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || "Erreur lors de l'inscription");
      } else {
        setMessage("Erreur de connexion à l’API");
      }
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
          Crée ton compte 🌱
        </h2>
        {message && (
          <p style={{ color: message.includes("réussie") ? "#16a34a" : "#dc2626", textAlign: "center", marginBottom: "1rem" }}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            name="name"
            placeholder="Nom complet"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
          />

          <button type="submit" style={{
            background: "#16a34a",
            color: "#fff",
            padding: "0.8rem",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}>
            S'inscrire
          </button>
        </form>
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Déjà inscrit ?{" "}
          <Link to="/login" style={{ color: "#16a34a", textDecoration: "underline" }}>
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
