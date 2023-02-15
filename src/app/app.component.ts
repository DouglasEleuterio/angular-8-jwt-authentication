import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './_services/token-storage.service';
import {AuthoritiesModel} from './model/authorities-model';
import {UserModel} from './model/user-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: AuthoritiesModel[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  user: UserModel;

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.authorities;
      this.username = user.username;
      this.user = user;
    }

    for (const role of this.roles) {
      this.showAdminBoard = role.name === 'ROLE_ADMIN';
      if (this.showAdminBoard === true) {
        break;
      }
    }
    for (const role of this.roles) {
      this.showModeratorBoard = role.name === 'ROLE_USER';
      if (this.showModeratorBoard === true) {
        break;
      }
    }

    this.roles.forEach(value => console.log(value.name));
  }

  logout() {
    this.isLoggedIn = false;
    this.tokenStorageService.signOut();
    window.location.href = '/aterrosystem-frontend';
  }

  navegarParaDashboard() {
    // window.location.href = '/aterrosystem-frontend';
  }
}
