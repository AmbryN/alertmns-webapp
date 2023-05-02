import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public connectedUser: User | null = null;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.loggedInUser$.subscribe((user) => {
      this.connectedUser = user;
    });
  }

  onLogout(): void {
    this.loginService.logout();
  }
}
