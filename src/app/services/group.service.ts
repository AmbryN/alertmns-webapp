import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/Group';
import { environment } from '../../environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(environment.serverUrl + '/groups');
  }

  getGroup(groupId: number): Observable<Group> {
    return this.http.get<Group>(environment.serverUrl + '/groups/' + groupId);
  }

  addGroup(group: Group): Observable<Group> {
    console.log(group);
    return this.http.post<Group>(environment.serverUrl + '/groups', group);
  }

  addMember(groupId: number, users: User[]): Observable<Group> {
    return this.http.post<Group>(
      environment.serverUrl + `/groups/${groupId}/members`,
      users
    );
  }

  removeMember(groupId: number, userId: number): Observable<any> {
    return this.http.delete(
      environment.serverUrl + `/groups/${groupId}/members/${userId}`
    );
  }
}
