
import DOMPurify from 'dompurify';

// Nettoie l’entrée utilisateur pour éviter XSS
export const sanitizeInput = (input) => {
  const cleaned = DOMPurify.sanitize(input);
  return cleaned.length > 255 ? cleaned.substring(0, 255) : cleaned;
};

// Empêche les envois trop rapprochés
let lastMessageTime = Date.now();

export const isAllowedToSend = (delay = 1500) => {
  const now = Date.now();
  if (now - lastMessageTime < delay) {
    return false;
  }
  lastMessageTime = now;
  return true;
};
