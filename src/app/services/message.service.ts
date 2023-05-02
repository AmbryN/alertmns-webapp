import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/Message';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Store } from '@ngrx/store';
import { AppState } from '../state/App.state';
import { receiveMessage } from '../state/messages/message.action';

const messageSocketUrl = 'ws://localhost:8080/discord/socket/';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public subject: WebSocketSubject<Message> | undefined;

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getMessages(channelId: number): Observable<Message[]> {
    this.subject?.unsubscribe();
    this.subject = webSocket(messageSocketUrl + channelId);
    this.subject.subscribe((message) =>
      this.store.dispatch(receiveMessage({ message }))
    );

    return this.http.get<Message[]>(
      `http://localhost:8080/discord/api/channels/${channelId}/messages`
    );
  }

  saveMessage(message: Message): void {
    return this.subject?.next(message);
  }
}
