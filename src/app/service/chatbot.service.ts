import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Chatbot } from '../model/chatbot.model';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private messagesCollection: AngularFirestoreCollection<Chatbot>;

  constructor(private firestore: AngularFirestore) {
    // Initialise la collection Firestore "messages" avec tri par timestamp
    this.messagesCollection = this.firestore.collection<Chatbot>('messages', ref =>
      ref.orderBy('timestamp')
    );
  }

  /**
   * Récupère les messages depuis Firestore, triés par timestamp
   */
  getMessages(): Observable<Chatbot[]> {
    return this.messagesCollection.valueChanges({ idField: 'id' });
  }

  /**
   * Envoie un message utilisateur dans Firestore
   */
  sendMessage(message: Chatbot): Promise<void> {
    const id = this.firestore.createId();
    return this.messagesCollection.doc(id).set(message)
      .catch(error => {
        console.error('Erreur lors de l\'envoi du message :', error);
        throw error;
      });
  }

  /**
   * Simule une réponse du bot (remplaçable par une API réelle)
   */
  async sendBotReply(userMessage: string): Promise<void> {
    const botReply: Chatbot = {
      text: `Vous avez dit : ${userMessage}`,
      sender: 'bot',
      timestamp: Date.now(),
      id: ''
    };
    return this.sendMessage(botReply);
  }
}
