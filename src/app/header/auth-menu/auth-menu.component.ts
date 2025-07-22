import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";
import {UserService} from "../../services/user.service";

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
  constructor(public authService: AuthService, private userService: UserService, private router: Router) {
  }

  logout() {
    this.authService.logout();
  }

  openRegisterForm() {
    this.userService.resetEditMode();
    this.router.navigate(["/Register"]);
  }
}
