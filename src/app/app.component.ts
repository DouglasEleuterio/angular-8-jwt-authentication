import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.authorities;

       this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
       this.showModeratorBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }
    alert(JSON.stringify(this.roles));
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
