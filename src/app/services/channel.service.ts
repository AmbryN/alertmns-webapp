import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Channel } from '../models/Channel';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(private http: HttpClient) {}

  getChannel(id: number): Observable<Channel> {
    return this.http.get<Channel>(environment.serverUrl + '/channels/' + id);
  }
}
