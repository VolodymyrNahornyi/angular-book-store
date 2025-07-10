import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'auth-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './auth-menu.component.html',
  styleUrl: './auth-menu.component.css'
})
export class AuthMenuComponent {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
