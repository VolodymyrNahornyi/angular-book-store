import { Component } from '@angular/core';
import {LoginComponent} from "../login-form/login.component";
import {LoginModel} from "../../model/login.model";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    LoginComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  login(data: LoginModel) {
    console.log(data)
    //login and navigate to the main page
  }
}
