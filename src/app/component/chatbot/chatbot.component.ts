import { Component, OnInit } from '@angular/core';
import { Chatbot } from 'src/app/model/chatbot.model';
import { ChatbotService } from 'src/app/service/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  standalone:false,
})
export class ChatbotComponent implements OnInit {

  userMessage: string = '';
  messages: Chatbot[] = [];

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {
    this.chatbotService.getMessages().subscribe((data: Chatbot[]) => {
      this.messages = data;
    });
  }

  sendMessage(): void {
    if (!this.userMessage.trim()) return;

    const message: Chatbot = {
      text: this.userMessage,
      sender: 'user',
      timestamp: Date.now(),
      id: ''
    };

    this.chatbotService.sendMessage(message)
      .then(() => this.chatbotService.sendBotReply(this.userMessage))
      .catch(err => console.error('Erreur lors de l\'envoi du message :', err));

    this.userMessage = '';
  }
}
