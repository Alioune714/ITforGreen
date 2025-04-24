import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ChatbotBubble from './ChatbotBubble'; 
import { Link, useNavigate } from 'react-router-dom'; // ✅ Ajoute useNavigate ici

const courses = [
  {
    title: "Python  | Formation Complète 2025",
    author: "Jonathan Roux",
    rating: 4.7,
    price: "22,99 €",
    badge: "Meilleure vente",
    image: "/assets/Python.jpg",
  },
  {
    title: "UX UI : Formation complète ",
    author: "Yassine Rochd",
    rating: 4.6,
    price: "19,99 €",
    image: "/assets/uxui.jpg",
  },
  {
    title: "Développement Web: Le Cours Complet",
    author: "Dr. Firas",
    rating: 4.5,
    price: "22,99 €",
    image: "/assets/devweb.jpg",
  },
];

export default function Homepage() {
  const navigate = useNavigate(); // ✅ Initialise le hook ici

  return (
    <div className="font-sans">
      {/* Bandeau promo */}
      <div className="bg-green-100 text-center p-3 text-sm font-medium">
        🌱 <span className="font-bold">Edubot agit pour un numérique responsable</span> | Explorez nos formations avec évaluation carbone intégrée.
      </div>

      {/* Hero section */}
      <section className="relative bg-gradient-to-r from-green-50 via-white to-green-50 py-20 px-8 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Une IA au service de la planète
            </h1>
            <p className="text-lg text-gray-700 max-w-xl mx-auto lg:mx-0">
              Edubot vous propose un apprentissage personnalisé tout en mesurant l’empreinte carbone de chaque module.
              Apprenez en toute conscience écologique, contribuant à un avenir plus vert.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/recommandations" className="bg-green-600 hover:bg-green-700 text-white text-base font-semibold px-6 py-3 rounded-full shadow">
                Explorer les formations
              </Link>
              <div className="flex items-center space-x-1 text-sm text-gray-700">
                <span className="font-bold text-black text-base">4.8/5</span>
                <div className="flex space-x-0.5 text-yellow-400 text-lg">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <span className="ml-1 text-gray-500">(2676 avis)</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="overflow-hidden rounded-[3rem] shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out">
              <img src="/assets/etudiants.jpg" alt="etudiants" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Carrousel */}
      <section className="py-10 px-6">
        <h2 className="text-2xl font-bold mb-4">Formations populaires (évaluées écologiquement)</h2>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {courses.map((course, index) => (
            <SwiperSlide
              key={index}
              className="bg-white shadow-xl rounded-lg overflow-hidden hover:scale-105 transform transition-all duration-300"
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.author}</p>
                <div className="flex items-center text-yellow-500 text-sm my-1">
                  ★ {course.rating}
                </div>
                <p className="font-bold text-lg">{course.price}</p>
                {course.badge && (
                  <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {course.badge}
                  </span>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Pourquoi Edubot */}
      <section className="bg-gray-50 px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-green-800">Pourquoi Edubot est différent ?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-green-600">♻️ Analyse d'impact environnemental</h3>
              <p className="text-gray-600">
                Chaque module est analysé pour sa consommation estimée. Vous êtes ainsi acteur de vos choix écologiques, et chaque formation vous guide vers un avenir plus vert.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-green-600">🤖 Recommandations intelligentes</h3>
              <p className="text-gray-600">
                Notre IA vous oriente vers des formations pertinentes et à faible empreinte carbone, en vous aidant à faire des choix éclairés pour un impact réduit.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-green-600">🔐 Données protégées</h3>
              <p className="text-gray-600">
                La confidentialité de vos données est notre priorité. Apprenez en toute sérénité, en sachant que vos informations personnelles sont en sécurité.
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-auto text-sm">
              <code>
{`class Parcours:
  def __init__(self, modules):
    self.modules = modules

  def empreinte_totale(self):
    return sum(m.trace_carbone for m in self.modules)`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Impact écologique */}
      <section className="bg-green-50 px-6 py-12">
        <h2 className="text-2xl font-bold mb-4 text-green-800">🌍 L'éducation au service de l’environnement</h2>
        <p className="text-lg text-gray-700">
          Grâce à Edubot, chaque utilisateur peut suivre un parcours sur mesure tout en ayant une vision claire de l'impact écologique de sa formation. Une manière concrète de lier apprentissage et développement durable, pour un futur plus responsable.
        </p>
      </section>

      {/* Témoignages */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Voir ce que d'autres apprenants disent d'Edubot
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{
              text: "Edubot m’a permis de concilier apprentissage et écologie. Je sais désormais combien chaque module impacte l’environnement.",
              name: "Lina Bertrand",
              title: "Étudiante en développement durable",
              avatar: "/assets/personne1.jpeg",
            },
            {
              text: "Grâce aux recommandations intelligentes, j’ai optimisé mon parcours en choisissant les formations les moins énergivores.",
              name: "Samuel Leroy",
              title: "Freelance en IA éthique",
              avatar: "/assets/personne3.jpeg",
            },
            {
              text: "Une super plateforme qui m’a sensibilisé à l’impact numérique tout en montant en compétences dans le cloud.",
              name: "Claire Dumont",
              title: "Consultante Cloud",
              avatar: "/assets/personne2.jpeg",
            },
            {
              text: "Je recommande vivement Edubot à toutes les personnes qui souhaitent apprendre tout en respectant la planète.",
              name: "Julien Favre",
              title: "Professeur d'informatique",
              avatar: "/assets/personne4.jpeg",
            }].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
                <p className="text-gray-800 mb-4 italic">“{testimonial.text}”</p>
                <div className="flex items-center mt-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <button
  onClick={() => navigate('/chatbot')}
  className="floating-chatbot-btn flex items-center gap-2 px-6 py-3 rounded-full text-lg"
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#22c55e",
    color: "white",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
    zIndex: 9999,
    transition: "all 0.3s"
  }}
>
  🤖 <span className="hidden sm:inline">Discuter avec Edubot</span>
</button>


    </div>
  );
}
