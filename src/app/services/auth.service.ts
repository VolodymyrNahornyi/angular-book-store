import {inject, Injectable} from '@angular/core';
import {UserService} from "./user.service";
import {HttpClient} from "@angular/common/http";
import {UserForCreation} from "../model/userForCreation.model";
import {AuthResponseModel} from "../model/AuthResponseModel";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: boolean = false;
  userService: UserService = inject(UserService);

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    let user = this.userService.getUsers().find(user => user.username === username
      && user.password === password);

    if (user === undefined) {
      this.isLogged = false;
    } else {
      this.isLogged = true;
    }
    return user;
  }

  logout() {
    this.isLogged = false;
  }

  isAuthenticated() {
    return this.isLogged;
  }

  signUp(user: UserForCreation) {
    let data = {email: user.email, password: user.password, returnSecureToken: true};
    return this.http.post<AuthResponseModel>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=\n' +
        'AIzaSyDkl-yk_32CDsk5lpEeQk4RawOxjr5nXM8', data);
  }
}
