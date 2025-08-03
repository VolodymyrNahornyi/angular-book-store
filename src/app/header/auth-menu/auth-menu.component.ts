import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";

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
export class AuthMenuComponent implements OnInit, OnDestroy{

  isLoggedIn: boolean = false;
  private userSubject!: Subscription;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
  }

  ngOnDestroy(): void {
    this.userSubject.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubject = this.authService.user$.subscribe((user) =>{
      this.isLoggedIn = !!user;
    });
  }

  openRegisterForm() {
    this.userService.resetEditMode();
    this.router.navigate(["/Register"]);
  }


  logOut() {
    this.authService.signOut();
  }
}
