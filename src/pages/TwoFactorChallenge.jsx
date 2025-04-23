import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TwoFactorChallenge = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Récupération CSRF (obligatoire avec Sanctum)
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const response = await axios.post(
        "http://localhost:8000/two-factor-challenge",
        { code },
        {
          withCredentials: true,
        }
      );

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setMessage("✅ Authentification réussie !");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setMessage("❌ Code incorrect ou expiré.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f9fafb" }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        maxWidth: "400px",
        width: "100%",
        textAlign: "center"
      }}>
        <h2>🔐 Validation 2FA</h2>
        <p>Entrez le code généré par votre application d’authentification</p>

        <input
          type="text"
          placeholder="Code à 6 chiffres"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          style={{ padding: "0.8rem", marginTop: "1rem", borderRadius: "8px", border: "1px solid #ccc", width: "100%" }}
        />

        <button type="submit" style={{
          marginTop: "1rem",
          background: "#16a34a",
          color: "#fff",
          padding: "0.8rem 1rem",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          Vérifier
        </button>

        {message && (
          <p style={{ marginTop: "1rem", color: message.includes("✅") ? "green" : "red" }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default TwoFactorChallenge;
