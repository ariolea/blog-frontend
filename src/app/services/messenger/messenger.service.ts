import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  private _chatVisible = new BehaviorSubject<boolean>(false);

  get chatVisible() {
    return this._chatVisible.asObservable();
  }

  toggleChatVisibility() {
    this._chatVisible.next(!this._chatVisible.value);
  }
}
