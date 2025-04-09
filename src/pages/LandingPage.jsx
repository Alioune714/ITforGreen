import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LandingPage = () => {
  const formationsUdemy = [
    {
      name: 'Développement Web Moderne',
      platform: 'Udemy',
      description: 'HTML, CSS, JS & React',
      img: '/assets/devweb.jpg'
    },
    {
      name: 'UX Design Durable',
      platform: 'Udemy',
      description: 'Créer des interfaces écologiques',
      img: '/assets/uxui.jpg'
    },
    {
      name: 'Python pour l’IA verte',
      platform: 'Udemy',
      description: 'Écrire du code éco-efficace',
      img: '/assets/Python.jpg'
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div className="home-wrapper">
      {/* Header */}
      <header className="home-header" style={{
        padding: "1.5rem 3rem",
        background: "#f0fdf4",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div className="logo" style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#16a34a" }}>
          IT for Green 🌿
        </div>
        <div className="nav-links" style={{ display: "flex", gap: "1rem" }}>
          <Link to="/login" className="btn-outline">Se connecter</Link>
          <Link to="/register" className="btn-solid">S'inscrire</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="hero" style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "4rem 3rem"
      }}>
        <div className="hero-text" style={{ maxWidth: "500px", flex: "1 1 300px" }}>
          <h1>Oriente ton avenir vert 🌱</h1>
          <p>Une plateforme e-learning assistée par un ChatBot IA pour un apprentissage personnalisé et écoresponsable.</p>
          <Link to="/login" className="cta-button"
            style={{
              background: "#16a34a",
              color: "#fff",
              padding: "0.8rem 1.5rem",
              borderRadius: "10px",
              marginTop: "1rem",
              display: "inline-block"
            }}>
            Commencer
          </Link>
        </div>
        <div className="hero-image" style={{ flex: "1 1 300px", textAlign: "center" }}>
          <img
            src="/assets/etudiants.jpg"
            alt="Illustration"
            style={{ maxWidth: "100%", borderRadius: "12px", height: "300px", objectFit: "cover" }}
          />
        </div>
      </section>

      {/* Carrousel Udemy */}
      <section className="scoring-section" style={{ padding: "3rem", backgroundColor: "#f9f9f9" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Formations e-learning en vedette 🌱</h2>
        <Slider {...settings}>
          {formationsUdemy.map((formation, index) => (
            <div key={index} style={{
              background: "#fff",
              padding: "1rem",
              borderRadius: "12px",
              margin: "1rem",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              height: "450px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <img
                  src={formation.img}
                  alt={formation.name}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                    borderRadius: "8px"
                  }}
                />
              </div>

              <div style={{ marginTop: "1rem", padding: "0 0.5rem" }}>
                <h3 style={{ fontSize: "1rem", marginBottom: "0.2rem" }}>{formation.name}</h3>
                <p style={{ fontSize: "0.9rem", color: "#555" }}>Cours en ligne • {formation.description}</p>
              </div>

              <a
                href="https://www.udemy.com/fr/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#16a34a",
                  color: "#fff",
                  border: "none",
                  padding: "0.6rem 1rem",
                  borderRadius: "6px",
                  textDecoration: "none",
                  display: "inline-block",
                  marginTop: "1rem",
                  width: "fit-content",
                  alignSelf: "center"
                }}
              >
                Voir sur Udemy
              </a>
            </div>
          ))}
        </Slider>
      </section>

      {/* Footer */}
      <footer className="footer" style={{
        textAlign: "center",
        padding: "1rem",
        backgroundColor: "#f0fdf4",
        marginTop: "2rem"
      }}>
        <p>© 2025 IT for Green. Un projet PPE - ChatBot IA & Scoring Écologique.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
