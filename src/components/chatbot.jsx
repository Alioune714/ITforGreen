import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react'; // pour l'icône de fermeture
import './Chatbot.css';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // 👈 pour ouvrir/fermer

  useEffect(() => {
    fetch('/data/udemy.json')
      .then((res) => res.json())
      .then((json) => setCourses(json))
      .catch((err) =>
        console.error('Erreur lors du chargement des formations :', err)
      );

    setMessages([
      {
        sender: 'chatbot',
        message: 'Bonjour 👋 Quels sont vos centres d’intérêt ?',
      },
    ]);
  }, []);

  const handleMessageSubmit = () => {
    if (!userMessage.trim()) return;

    const userMsg = userMessage.trim();
    setMessages((prev) => [...prev, { sender: 'user', message: userMsg }]);
    setUserMessage('');
    setLoading(true);

    setTimeout(() => {
      const query = userMsg.toLowerCase();
      const result = courses.find(
        (course) =>
          course.course_title.toLowerCase().includes(query) ||
          course.subject.toLowerCase().includes(query)
      );

      if (result) {
        const carbone = (result.content_duration * 0.6).toFixed(2);
        setMessages((prev) => [
          ...prev,
          {
            sender: 'chatbot',
            message: `📚 Formation recommandée : ${result.course_title}.\n⏳ Durée : ${result.content_duration}h\n🌿 Empreinte carbone estimée : ${carbone} g CO₂`,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'chatbot',
            message: `😕 Désolé, je n’ai pas trouvé de formation correspondant à "${userMsg}".`,
          },
        ]);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      {/* Bouton d'ouverture du chatbot */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-50"
        >
          💬
        </button>
      )}

      {/* Fenêtre du chatbot */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-white shadow-2xl rounded-xl overflow-hidden z-50 flex flex-col">
          {/* En-tête avec bouton fermer */}
          <div className="bg-green-600 text-white p-3 flex justify-between items-center">
            <span className="font-semibold">Edubot</span>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
              <X size={20} />
            </button>
          </div>

          {/* Corps du chat */}
          <div className="flex-1 p-4 overflow-y-auto max-h-96">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-green-100 text-gray-800' : 'bg-gray-100 text-gray-800'}`}>
                  {msg.message}
                </div>
              </div>
            ))}
            {loading && <p className="text-sm italic text-gray-400">Edubot réfléchit...</p>}
          </div>

          {/* Zone de saisie */}
          <div className="p-2 border-t flex">
            <input
              type="text"
              className="flex-1 border rounded-l px-2 py-1 text-sm focus:outline-none"
              placeholder="Votre message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleMessageSubmit()}
            />
            <button
              onClick={handleMessageSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-r text-sm"
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
