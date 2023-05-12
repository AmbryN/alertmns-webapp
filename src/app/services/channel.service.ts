import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Channel } from '../models/Channel';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from './baseUrl';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(private http: HttpClient) {}

  getChannel(id: number): Observable<Channel> {
    return this.http.get<Channel>(baseUrl + '/channels/' + id);
  }
}
