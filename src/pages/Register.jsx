import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Validation stricte du mot de passe
const schema = yup.object({
  name: yup.string().required("Le nom est obligatoire"),
  email: yup.string().email("Email invalide").required("Email obligatoire"),
  password: yup
    .string()
    .required("Mot de passe obligatoire")
    .min(12, "Le mot de passe doit contenir au moins 12 caractères")
    .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .matches(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
    .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .matches(/[^a-zA-Z0-9]/, "Le mot de passe doit contenir au moins un caractère spécial"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Les mots de passe doivent correspondre")
    .required("Confirmation obligatoire"),
}).required();

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      setMessage("Inscription réussie ✅");

      navigate("/landing");
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || "Erreur lors de l'inscription");
      } else {
        setMessage("Erreur de connexion à l’API");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0fdf4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.8rem",
            marginBottom: "1rem",
            color: "#16a34a",
          }}
        >
          Crée ton compte 🌱
        </h2>

        {message && (
          <p
            style={{
              color: message.includes("réussie") ? "#16a34a" : "#dc2626",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="text"
            placeholder="Nom complet"
            {...register("name")}
            style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.name?.message}</p>

          <input
            type="email"
            placeholder="Adresse e-mail"
            {...register("email")}
            style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.email?.message}</p>

          <input
            type="password"
            placeholder="Mot de passe"
            {...register("password")}
            style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.password?.message}</p>

          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            {...register("confirmPassword")}
            style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <p style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.confirmPassword?.message}
          </p>

          <button
            type="submit"
            style={{
              background: "#16a34a",
              color: "#fff",
              padding: "0.8rem",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
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
