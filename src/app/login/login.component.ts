import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import {Router} from '@angular/router';
import {AuthoritiesModel} from "../model/authorities-model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component2.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: AuthoritiesModel[];

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().authorities;
      this.navegarParaDashboard();
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.idToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().authorities;
        this.navegarParaDashboard();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  navegarParaDashboard() {
    this.router.navigate(['/painel-financeiro']);
  }
}
