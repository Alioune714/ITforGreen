import axios from "axios";
import { useState } from "react";

const VerifyEmailNotice = () => {
  const [message, setMessage] = useState("");

  const resendVerification = async () => {
    try {
      // 1️⃣ Étape 1 : Récupérer le cookie CSRF via Sanctum
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      // 2️⃣ Étape 2 : Envoyer la requête POST protégée
      await axios.post(
        "http://localhost:8000/email/verification-notification",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      setMessage("Lien de vérification renvoyé !");
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de l'envoi.");
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>📧 Vérifie ton adresse e-mail</h2>
      <p>Un lien de vérification a été envoyé.</p>
      <button onClick={resendVerification}>Renvoyer le lien</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyEmailNotice;
