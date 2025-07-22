import {Component, OnInit} from '@angular/core';
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
export class RegistrationPageComponent implements OnInit {

  isEditMode!: boolean;
  selectedUser!: UserForCreation;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.selectedUser$.subscribe((user) => {
      if (user) {
        this.selectedUser = user;
      } else {
        this.userService.resetEditMode();
      }
    });

    this.userService.isEditMode$.subscribe((isEditMode) => {
      this.isEditMode = isEditMode;
    });
  }

  CreateUser(user: UserForCreation) {
    if (this.isEditMode) {
      this.userService.updateUser(this.selectedUser.id, user).subscribe(() => {
        this.userService.resetEditMode();
        this.router.navigate(['/Users']);
      });
    } else {
      this.userService.addUser(user).subscribe(() => {
        this.router.navigate(['/Users']);
      });
    }
  }
}
