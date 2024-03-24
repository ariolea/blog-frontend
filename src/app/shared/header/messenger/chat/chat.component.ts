import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ElementRef, OnChanges, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked  {
  @ViewChild('lastMessage')
  lastMessage!: ElementRef;
  userLoginOn: boolean = false;
  element!: HTMLElement; // Cambio de tipo a HTMLElement
  chat?: boolean;
  chatMostrado = false;

  constructor(private elementRef: ElementRef, private loginService: LoginService, private messengerService: MessengerService) {
    this.loginService.userLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })

    this.messengerService.chatVisible.subscribe((chat) => {
      this.chat = chat;
    });

  }

  

  ngAfterViewChecked(): void {
    if (this.lastMessage && !this.chatMostrado) {
      this.lastMessage.nativeElement.scrollIntoView({ block: 'end' });// Enfoca el último mensaje
      this.chatMostrado = true;
    }
  }


}
