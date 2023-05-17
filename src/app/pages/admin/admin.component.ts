import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  items = [
    {
      name: 'Utilisateurs',
      link: 'users',
      icon: 'person',
    },
    {
      name: 'Groupes',
      link: 'groups',
      icon: 'groups',
    },
    {
      name: 'Channels',
      link: '',
      icon: 'forum',
    },
    {
      name: 'Statistiques',
      link: '',
      icon: 'analytics',
    },
  ];
}
