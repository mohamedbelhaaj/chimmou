export interface Chatbot {
    text: string;
    sender: 'user' | 'bot';
    timestamp: number;
    id: string; // ajouté automatiquement par Firestore si besoin
  }
  