import React, { useState } from 'react';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('favorites');

  const user = {
    name: 'Alioune Diallo',
    email: 'alioune@example.com',
    profilePic: 'https://i.pravatar.cc/150?img=3',
    stats: {
      coursesTaken: 12,
      completed: 8,
      ecoScore: 82,
    },
    favorites: [
      { title: 'Forex Trading Secrets of the Pros With Amazons AWS', image: '/src/assets/devweb.jpg' },
      { title: 'Complete GST Course & Certification - Grow Your CA Practice', image: '/src/assets/trading.jpg' },
    ],
    recommendations: [
      { title: 'Python pour Data Science', score: 91 },
      { title: 'Green IT & Eco-Conception', score: 87 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center p-8 border-b">
          <img
            src={user.profilePic}
            alt="Profil"
            className="w-32 h-32 rounded-full border-4 border-green-400 shadow-md"
          />
          <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <div className="mt-4 flex justify-center md:justify-start gap-4">
              <div className="bg-green-100 px-4 py-2 rounded-xl text-center shadow">
                <p className="text-lg font-semibold text-green-700">{user.stats.coursesTaken}</p>
                <p className="text-xs text-gray-600">Cours suivis</p>
              </div>
              <div className="bg-blue-100 px-4 py-2 rounded-xl text-center shadow">
                <p className="text-lg font-semibold text-blue-700">{user.stats.completed}</p>
                <p className="text-xs text-gray-600">Terminés</p>
              </div>
              <div className="bg-emerald-100 px-4 py-2 rounded-xl text-center shadow">
                <p className="text-lg font-semibold text-emerald-700">{user.stats.ecoScore}%</p>
                <p className="text-xs text-gray-600">Score écolo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-8 pt-6">
          <div className="flex gap-4 border-b pb-2 mb-6">
            <button
              onClick={() => setActiveTab('favorites')}
              className={`pb-2 font-medium ${
                activeTab === 'favorites'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500'
              }`}
            >
              ⭐ Formations favorites
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`pb-2 font-medium ${
                activeTab === 'ai'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500'
              }`}
            >
              🤖 Recommandations IA
            </button>
          </div>

          {/* Tab content */}
          {activeTab === 'favorites' && (
            <div className="grid sm:grid-cols-2 gap-6">
              {user.favorites.map((course, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4">
              {user.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="bg-white border rounded-lg p-4 shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-md font-semibold">{rec.title}</h3>
                    <p className="text-sm text-gray-500">Recommandé par IA</p>
                  </div>
                  <span className="text-green-600 font-bold">{rec.score}%</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-8 py-6 text-right border-t">
          <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
            Modifier mon profil
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
