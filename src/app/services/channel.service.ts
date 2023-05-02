import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Channel } from '../models/Channel';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(private http: HttpClient) {}

  getUserChannels(user: User): Observable<Channel[]> {
    return this.http.get<Channel[]>(
      `http://localhost:8080/discord/api/users/my_channels`
    );
  }
}
