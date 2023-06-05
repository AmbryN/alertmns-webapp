import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Channel } from '../../models/Channel';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../models/User';
import { Group } from '../../models/Group';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(private http: HttpClient) {}

  getChannels(): Observable<Channel[]> {
    return this.http.get<Channel[]>(environment.serverUrl + '/channels');
  }

  getChannel(id: number): Observable<Channel> {
    return this.http.get<Channel>(environment.serverUrl + '/channels/' + id);
  }

  createChannel(channel: Channel): Observable<Channel> {
    return this.http.post<Channel>(
      environment.serverUrl + '/channels',
      channel
    );
  }

  addUsers(channelId: number, users: User[]): Observable<Channel> {
    return this.http.post<Channel>(
      environment.serverUrl + '/channels/' + channelId + '/members',
      users
    );
  }

  removeUser(channelId: number, userId: number): Observable<Channel> {
    return this.http.delete<Channel>(
      environment.serverUrl + '/channels/' + channelId + '/members/' + userId
    );
  }

  addGroups(channelId: number, groups: Group[]): Observable<Channel> {
    return this.http.post<Channel>(
      environment.serverUrl + '/channels/' + channelId + '/groups',
      groups
    );
  }

  removeGroup(channelId: number, groupId: number): Observable<Channel> {
    return this.http.delete<Channel>(
      environment.serverUrl + '/channels/' + channelId + '/groups/' + groupId
    );
  }

  updateChannel(channel: Channel): Observable<Channel> {
    return this.http.put<Channel>(environment.serverUrl + '/channels', channel);
  }
}
