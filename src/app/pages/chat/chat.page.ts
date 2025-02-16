import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  // Definieer de messages array
  messages = [
    { text: 'Hallo!', sender: 'user' },
    { text: 'Hi, hoe gaat het?', sender: 'admin' },
  ];

  // Definieer de nieuwe bericht
  newMessage: string = '';

  // Methode om een bericht te versturen
  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, sender: 'user' });
      this.newMessage = ''; // Reset het invoerveld na het versturen
    }
  }
}

