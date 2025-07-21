import { Component } from '@angular/core';
import {RegistrationFormComponent} from "./registration-form/registration-form.component";
import {UserForCreation} from "../../model/userForCreation.model";
import {UserService} from "../../services/user.service";

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

  constructor(private userService: UserService) {
  }

  CreateUser(user: UserForCreation) {
    this.userService.addUser(user).subscribe((response) => {
      console.log(response)
    });
  }
}
