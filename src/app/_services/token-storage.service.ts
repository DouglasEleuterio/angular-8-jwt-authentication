import {Injectable} from '@angular/core';
import {UserModel} from '../model/user-model';

const TOKEN_KEY = 'idToken';
const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): UserModel {
    let response = JSON.parse(sessionStorage.getItem(USER_KEY));
    let user = new UserModel(
      response.user.username,
      response.user.firstname,
      response.user.lastname,
      response.user.email,
      response.user.activated,
      response.user.authorities);
    console.log(user);
    return user;
  }
}
