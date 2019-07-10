import { AppUser } from './../models/app-user';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  user: AppUser;

  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(user => this.user = user);
  }

  logout() {
    this.auth.logout();
  }
}
