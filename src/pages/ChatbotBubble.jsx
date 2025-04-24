import React, { useState, useEffect } from 'react';
import './Chatbot.css';
import DOMPurify from 'dompurify';
import { sanitizeInput, isAllowedToSend } from './Chatbotsecur';




const Chatbot = () => {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({ name: '', interest: '', subject: '', level: '', hours: '' });
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastMsgTime, setLastMsgTime] = useState(Date.now());

  useEffect(() => {
    fetch('/data/udemy.json')
      .then((res) => res.json())
      .then((json) => setCourses(json))
      .catch((err) => console.error('Erreur JSON :', err));

    setMessages([{ sender: 'chatbot', type: 'text', message: 'Bonjour 👋 Quel est votre prénom ?' }]);
  }, []);

  const nextStep = (input) => {
    const updated = { ...userData };
    switch (step) {
      case 0:
        updated.name = input;
        setMessages((prev) => [...prev, { sender: 'chatbot', type: 'text', message: `Enchanté ${input} 😊 ! Quels sont tes domaines d’intérêt ?` }]);
        break;
      case 1:
        updated.interest = input;
        setMessages((prev) => [...prev, { sender: 'chatbot', type: 'text', message: 'Très bien ! Quelle formation t’intéresse précisément ?' }]);
        break;
      case 2:
        updated.subject = input;
        setMessages((prev) => [...prev, { sender: 'chatbot', type: 'text', message: 'Quel est ton niveau actuel (Débutant, Intermédiaire, Avancé) ?' }]);
        break;
      case 3:
        updated.level = input;
        setMessages((prev) => [...prev, { sender: 'chatbot', type: 'text', message: 'Combien d’heures souhaites-tu consacrer à ta formation ?' }]);
        break;
      case 4:
        updated.hours = input;
        recommendCourses(updated);
        break;
      default:
        break;
    }

    setUserData(updated);
    setStep(step + 1);
  };

  const recommendCourses = (data) => {
    setLoading(true);
    const filtered = courses
      .filter(c => c.subject.toLowerCase() === data.subject.toLowerCase())
      .filter(c => c.content_duration <= parseFloat(data.hours))
      .sort((a, b) => (a.content_duration * 0.6) - (b.content_duration * 0.6))
      .slice(0, 3);

    setTimeout(() => {
      if (filtered.length > 0) {
        const recos = filtered.map(course => ({
          sender: 'chatbot',
          type: 'card',
          course_title: course.course_title,
          url: course.url,
          carbone: (course.content_duration * 0.6).toFixed(2)
        }));
        setMessages(prev => [
          ...prev,
          { sender: 'chatbot', type: 'text', message: 'Voici 3 formations éco-friendly que je te recommande 👇' },
          ...recos
        ]);
      } else {
        setMessages(prev => [...prev, { sender: 'chatbot', type: 'text', message: 'Aucune formation ne correspond à ces critères 😕' }]);
      }
      setLoading(false);
    }, 1000);
  };

  const handleMessageSubmit = () => {
    if (!userMessage.trim()) return;

    // Empêche le flood
    if (Date.now() - lastMsgTime < 1500) return;
    setLastMsgTime(Date.now());

    const clean = sanitizeInput(userMessage.trim());
    if (!clean) return;

    setMessages(prev => [...prev, { sender: 'user', type: 'text', message: clean }]);
    setUserMessage('');
    setTimeout(() => nextStep(clean), 400);
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.sender}`}>
            {msg.type === 'text' ? (
              <p>{msg.message}</p>
            ) : (
              <div className="chatbot-card">
                <p><strong>📚 {msg.course_title}</strong></p>
                <a href={msg.url} target="_blank" rel="noreferrer">🔗 Lien vers la formation</a>
                <p>🌱 Indice carbone : {msg.carbone} kg CO₂</p>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="chat-bubble chatbot typing">
            <span className="dot"></span><span className="dot"></span><span className="dot"></span>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Votre réponse..."
          maxLength={255}
        />
        <button onClick={handleMessageSubmit} disabled={loading}>
          {loading ? '...' : '➤'}
        </button>
      </div>
    </div>
  );
};



export default Chatbot;
