import { Component } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger/messenger.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent {
  constructor(private messengerService: MessengerService) { }

  menu() {
    this.messengerService.toggleChatVisibility();
  }

}
