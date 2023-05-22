import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OutgoingMessage } from '../models/OutgoingMessage';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/App.state';
import { receiveMessage } from '../state/messages/message.action';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { IncomingMessage } from '../models/IncomingMessage';
import { environment } from '../../environments/environment';

const messageSocketUrl: string = `ws://localhost:8080/alertmns-api-0.0.1-SNAPSHOT/chat`;

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  stompClient?: CompatClient;

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getMessages(channelId: number): Observable<IncomingMessage[]> {
    return this.http.get<IncomingMessage[]>(
      environment.serverUrl + `/channels/${channelId}/messages`
    );
  }

  connect(channelId: number): void {
    this.stompClient?.disconnect();
    const connectionToken = localStorage.getItem('jwt')
      ? `&token=Bearer ${localStorage.getItem('jwt')}`
      : '';
    this.stompClient = Stomp.client(
      messageSocketUrl + `?channel=${channelId}` + connectionToken
    );
    this.stompClient.connect({}, (frame: any) => {
      this.stompClient!.subscribe(
        `/topic/messages/${channelId}`,
        (message: any) => {
          this.store.dispatch(
            receiveMessage({ message: JSON.parse(message.body) })
          );
        }
      );
    });
  }

  saveMessage(message: OutgoingMessage): Observable<any> {
    this.stompClient!.publish({
      destination: `/app/chat/${message.channelId}`,
      body: JSON.stringify(message),
    });
    return of();
  }
}
