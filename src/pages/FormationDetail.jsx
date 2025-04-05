import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Papa from 'papaparse'

export default function FormationDetail() {
  const { id } = useParams()
  const [module, setModule] = useState(null)

  useEffect(() => {
    Papa.parse('/data/udemy.csv', {
      header: true,
      download: true,
      complete: function (results) {
        const data = results.data
          .slice(0, 100)
          .map((item) => {
            const duree = parseFloat(item.content_duration) || 0
            const nbLectures = parseInt(item.num_lectures) || 0
            const nbSubscribers = parseInt(item.num_subscribers) || 0
            const nbReviews = parseInt(item.num_reviews) || 0
            const trace = calculTraceCarbone(duree, nbLectures, 'vidéo')

            return {
              titre: item.course_title,
              description: item.subject,
              niveau: item.level,
              duree,
              nbLectures,
              nbSubscribers,
              nbReviews,
              url: item.url,
              payant: item.is_paid === 'True' || item.is_paid === true,
              prix: item.price,
              date: item.published_timestamp,
              trace_carbone: trace,
              score_eco: scoreEco(trace)
            }
          })

        setModule(data[parseInt(id)])
      }
    })
  }, [id])

  // Calcul de la trace carbone estimée
  const calculTraceCarbone = (duree, nbLectures = 0, type = 'vidéo') => {
    const base = 0.3
    const facteurs = { vidéo: 1.5, texte: 0.5, audio: 1.0, mixte: 1.2 }
    const facteurType = facteurs[type] || 1
    const impactLectures = nbLectures * 0.01
    return +(duree * base * facteurType + impactLectures).toFixed(2)
  }

  // Évaluation du score écologique
  const scoreEco = (trace) => {
    if (trace < 1) return 'faible'
    if (trace <= 2.5) return 'moyen'
    return 'élevé'
  }

  // Affichage du chargement
  if (!module) return <div className="text-center py-20">Chargement...</div>

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg mt-10 rounded-xl">
      <Link to="/recommandations" className="text-blue-600 text-sm underline">
        ← Retour aux recommandations
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-2 text-green-700">{module.titre}</h1>
      <p className="text-gray-600 mb-4">{module.description}</p>

      <ul className="text-base space-y-2 mb-6">
        <li>🎯 <strong>Niveau :</strong> {module.niveau}</li>
        <li>📚 <strong>Durée :</strong> {module.duree} heures</li>
        <li>🎬 <strong>Nombre de vidéos :</strong> {module.nbLectures}</li>
        <li>👥 <strong>Participants :</strong> {module.nbSubscribers.toLocaleString()}</li>
        <li>📝 <strong>Commentaires :</strong> {module.nbReviews.toLocaleString()}</li>
        <li>💰 <strong>Prix :</strong> {module.payant ? `${module.prix} $` : 'Gratuit'}</li>
        <li>🗓️ <strong>Date de publication :</strong> {new Date(module.date).toLocaleDateString()}</li>
        <li>⚡ <strong>Trace carbone :</strong> {module.trace_carbone} kgCO₂e</li>
        <li>
          🌱 <strong>Score écologique :</strong>{' '}
          <span className={
            module.score_eco === 'faible' ? 'text-green-600' :
            module.score_eco === 'moyen' ? 'text-yellow-600' :
            'text-red-600'
          }>
            {module.score_eco.toUpperCase()}
          </span>
        </li>
      </ul>

      <a
        href={module.url}
        target="_blank"
        rel="noreferrer"
        className="inline-block bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
      >
        🚀 Accéder au cours sur Udemy
      </a>
    </div>
  )
}
