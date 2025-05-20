import {inject, Injectable} from '@angular/core';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: boolean = false;
  userService: UserService = inject(UserService);

  constructor() {
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
}
