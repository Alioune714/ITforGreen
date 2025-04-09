import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-green-50 py-16 px-6 md:px-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-6 leading-tight">
          Apprendre intelligemment,<br className="hidden md:block" /> agir durablement 🌍
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Avec EduBot, trouvez la formation idéale grâce à une intelligence artificielle à votre écoute. 
          Personnalisée, intuitive et respectueuse de l'environnement.
        </p>
        
      </section>

      {/* Mission */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-green-600 mb-4">Notre mission</h2>
            <p className="text-lg leading-relaxed">
              EduBot vous guide vers un parcours de formation sur-mesure grâce à une IA intelligente. Que vous soyez étudiant,
              professionnel ou en reconversion, notre chatbot analyse vos objectifs pour vous recommander les modules les plus
              pertinents.
            </p>
          </div>
          <img src="/assets/apprend.jpg" alt="apprend" className="w-foll h-full object-cover" />
        </div>
      </section>

      {/* Engagement écologique */}
      <section className="py-16 px-6 md:px-20 bg-green-50">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1508780709619-79562169bc64"
            alt="Sustainability"
            className="w-full rounded-lg shadow-md object-cover max-h-[300px]"
          />
          <div>
            <h2 className="text-3xl font-semibold text-green-600 mb-4">Un engagement écologique 🌿</h2>
            <p className="text-lg leading-relaxed">
              Notre plateforme ne se contente pas de former, elle sensibilise. Chaque parcours est analysé selon son empreinte carbone.
              Vous pouvez ainsi choisir non seulement selon vos envies, mais aussi selon l’impact environnemental.
            </p>
            <ul className="list-disc list-inside text-green-700 mt-4 space-y-1">
              <li>Scoring carbone de chaque module</li>
              <li>Recommandations éco-responsables</li>
              <li>Formation numérique consciente</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sécurité des données */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-green-600 mb-4">🔐 Vos données sont en sécurité</h2>
          <p className="text-lg leading-relaxed">
            EduBot respecte les normes de sécurité les plus strictes pour garantir la protection de vos données personnelles.
            Nous appliquons le RGPD et utilisons des systèmes de cryptage avancés.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 md:px-20 bg-green-700 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Rejoignez EduBot dès aujourd’hui 🚀</h2>
        <p className="text-lg mb-10">Construisez un avenir où apprentissage rime avec conscience écologique.</p>
        <Link
          to="/register"
          className="inline-block bg-white text-green-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition"
        >
          Créer un compte
        </Link>
      </section>
    </div>
  );
}
