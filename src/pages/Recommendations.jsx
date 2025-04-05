import React, { useEffect, useState } from 'react'
import Papa from 'papaparse'
import { Link } from 'react-router-dom'

export default function Recommendations() {
  const [modules, setModules] = useState([])

  useEffect(() => {
    Papa.parse('/data/udemy.csv', {
      header: true,
      download: true,
      complete: function (results) {
        const data = results.data
          .slice(0, 100)
          .map((module, index) => {
            const duree = parseFloat(module.content_duration) || 0
            const nbLectures = parseInt(module.num_lectures) || 0
            const trace = calculTraceCarbone(duree, nbLectures, 'vidéo')

            return {
              id: index,
              titre: module.course_title,
              description: module.subject,
              duree,
              niveau: module.level,
              trace_carbone: trace,
              score_eco: scoreEco(trace)
            }
          })

        setModules(data)
      }
    })
  }, [])

  // Calcul de la trace carbone
  const calculTraceCarbone = (duree, nbLectures = 0, type = 'vidéo') => {
    const base = 0.3
    const facteurs = {
      vidéo: 1.5,
      texte: 0.5,
      audio: 1.0,
      mixte: 1.2
    }
    const facteurType = facteurs[type] || 1
    const impactLectures = nbLectures * 0.01
    return +(duree * base * facteurType + impactLectures).toFixed(2)
  }

  // Score écologique
  const scoreEco = (trace) => {
    if (trace < 1) return 'faible'
    if (trace <= 2.5) return 'moyen'
    return 'élevé'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-10">
        🌍 Modules recommandés avec évaluation écologique
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {modules.map((module, index) => (
          <Link
            to={`/formation/${index}`} // ✅ lien actif pour les 100 premiers
            key={index}
            className="block"
          >
            <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {module.titre}
              </h2>
              <p className="text-sm text-gray-500 mb-3">{module.description}</p>

              <ul className="text-sm space-y-1 mb-4">
                <li>📚 <strong>Durée :</strong> {module.duree} h</li>
                <li>🎯 <strong>Niveau :</strong> {module.niveau}</li>
                <li>⚡ <strong>Trace carbone :</strong> {module.trace_carbone} kgCO₂e</li>
              </ul>

              <div
                className="inline-block px-3 py-1 rounded-full text-white text-xs font-medium shadow-sm"
                style={{
                  backgroundColor:
                    module.score_eco === 'faible'
                      ? '#16a34a'
                      : module.score_eco === 'moyen'
                      ? '#eab308'
                      : '#dc2626'
                }}
              >
                {module.score_eco.toUpperCase()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
