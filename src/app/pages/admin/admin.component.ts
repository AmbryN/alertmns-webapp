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
    },
    {
      name: 'Groupes',
      link: 'groups',
    },
    {
      name: 'Channels',
      link: '',
    },
    {
      name: 'Statistiques',
      link: '',
    },
  ];
}
