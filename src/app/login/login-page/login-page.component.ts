import { Component } from '@angular/core';
import {LoginComponent} from "../login-form/login.component";
import {LoginModel} from "../../model/login.model";
import {NgIf} from "@angular/common";
import {LoaderComponent} from "../../loader/loader.component";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    LoginComponent,
    NgIf,
    LoaderComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  login(data: LoginModel) {
    this.authService.signIn(data.email, data.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (errMsg) => {
        this.isLoading = false;
      }
    });
  }
}
