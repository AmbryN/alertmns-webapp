import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notification } from '../../models/Notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(
      environment.serverUrl + '/notifications'
    );
  }

  markNotificationsAsSeen(channelId: number): Observable<any> {
    return this.http.put(
      environment.serverUrl + '/notifications/channel/' + channelId,
      null
    );
  }
}
