import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from "../components/navbar";
import ChatbotBubble from "../components/ChatbotBubble"; // ✅ Import corrigé

export default function LandingPage() {
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
    <div>
      <Navbar />

      {/* Hero */}
      <section className="flex flex-wrap justify-between items-center p-12 bg-green-50">
        <div className="max-w-lg flex-1">
          <h1 className="text-4xl font-bold mb-4">Oriente ton avenir vert 🌱</h1>
          <p className="text-gray-700 mb-4">
            Une plateforme e-learning assistée par un ChatBot IA pour un apprentissage personnalisé et écoresponsable.
          </p>
          <Link to="/login" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 inline-block mt-2">
            Commencer
          </Link>
        </div>
        <div className="flex-1 text-center">
          <img src="/assets/etudiants.jpg" alt="Illustration" className="rounded-xl w-full max-w-md h-72 object-cover" />
        </div>
      </section>

      {/* Carrousel */}
      <section className="p-12 bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-8">Formations e-learning en vedette 🌱</h2>
        <Slider {...settings}>
          {formationsUdemy.map((formation, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-4 m-4 h-[450px] flex flex-col justify-between">
              <img src={formation.img} alt={formation.name} className="w-full h-48 object-cover rounded-lg" />
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{formation.name}</h3>
                <p className="text-gray-600 text-sm">{formation.description}</p>
              </div>
              <a
                href="https://www.udemy.com/fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 bg-green-600 text-white text-center rounded hover:bg-green-700"
              >
                Voir sur Udemy
              </a>
            </div>
          ))}
        </Slider>
      </section>

      {/* Chatbot Bubble */}
      <ChatbotBubble /> {/* ✅ Intégré proprement avec Tailwind en bas de page */}

      {/* Footer */}
      <footer className="text-center py-4 bg-green-50">
        <p className="text-sm text-gray-600">© 2025 IT for Green. Un projet PPE - ChatBot IA & Scoring Écologique.</p>
      </footer>
    </div>
  );
}
