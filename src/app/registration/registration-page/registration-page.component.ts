import { Component } from '@angular/core';
import {RegistrationFormComponent} from "./registration-form/registration-form.component";
import {UserForCreation} from "../../model/userForCreation.model";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-page',
  standalone: true,
    imports: [
        RegistrationFormComponent
    ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent {

  constructor(private userService: UserService, private router: Router) {
  }

  CreateUser(user: UserForCreation) {
    this.userService.addUser(user).subscribe(() => {
      this.router.navigate(['/Users']);
    });
  }
}
