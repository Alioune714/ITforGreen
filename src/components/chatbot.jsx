import React, { useState, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  // Charger les données JSON depuis public/data/
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
            message: `📚 Formation recommandée : ${result.course_title}\n🔗 Lien : ${result.url}\n🌱 Indice carbone estimé : ${carbone} kg CO₂`,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'chatbot',
            message:
              "Désolé 😔 je n’ai trouvé aucune formation correspondante. Essayez un autre mot-clé (ex : finance, trading, python...)",
          },
        ]);
      }

      setLoading(false);
    }, 700);
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.sender}`}>
            {msg.message.split('\n').map((line, j) => (
              <p key={j} style={{ margin: 0 }}>{line}</p>
            ))}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Posez votre question..."
        />
        <button onClick={handleMessageSubmit} disabled={loading}>
          {loading ? '...' : '➤'}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
