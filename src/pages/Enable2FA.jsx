import React, { useState, useEffect } from "react";
import axios from "axios";

const Enable2FA = () => {
  const [enabled, setEnabled] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [recoveryCodes, setRecoveryCodes] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchStatus = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setEnabled(!!user?.two_factor_secret);
    } catch {
      setEnabled(false);
    }
  };

  const fetchQRCode = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/two-factor-qr-code", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setQrCode(response.data.svg);
    } catch (err) {
      console.error("Erreur QR:", err);
    }
  };

  const fetchRecoveryCodes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/two-factor-recovery-codes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setRecoveryCodes(response.data);
    } catch (err) {
      console.error("Erreur recovery codes:", err);
    }
  };

  const enable2FA = async () => {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      await axios.post("http://localhost:8000/user/two-factor-authentication", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setMessage("✅ 2FA activée !");
      setEnabled(true);
      fetchQRCode();
      fetchRecoveryCodes();
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de l'activation.");
    }
  };

  const disable2FA = async () => {
    try {
      await axios.delete("http://localhost:8000/user/two-factor-authentication", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setMessage("❌ 2FA désactivée.");
      setEnabled(false);
      setQrCode(null);
      setRecoveryCodes([]);
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de la désactivation.");
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>🔐 Authentification à Deux Facteurs</h2>
      {message && <p style={{ marginTop: "1rem", color: "#16a34a" }}>{message}</p>}

      {enabled ? (
        <>
          <button onClick={disable2FA} style={buttonStyle}>
            Désactiver la 2FA
          </button>

          {qrCode ? (
            <div style={{ marginTop: "2rem" }}>
              <h4>📱 Scanne ce QR Code avec Google Authenticator :</h4>
              <div dangerouslySetInnerHTML={{ __html: qrCode }} />
            </div>
          ) : (
            <button onClick={fetchQRCode} style={buttonStyle}>
              Afficher le QR Code
            </button>
          )}

          {recoveryCodes.length > 0 ? (
            <div style={{ marginTop: "1rem" }}>
              <h4>🔑 Codes de récupération :</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {recoveryCodes.map((code, i) => (
                  <li key={i} style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
                    {code}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <button onClick={fetchRecoveryCodes} style={buttonStyle}>
              Afficher les codes de secours
            </button>
          )}
        </>
      ) : (
        <button onClick={enable2FA} style={buttonStyle}>
          Activer la 2FA
        </button>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: "0.8rem 1.2rem",
  backgroundColor: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "1rem",
};

export default Enable2FA;
