import {Component, OnInit} from '@angular/core';
import {RegistrationFormComponent} from "./registration-form/registration-form.component";
import {UserForCreation} from "../../model/userForCreation.model";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {LoaderComponent} from "../../loader/loader.component";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    RegistrationFormComponent,
    LoaderComponent,
    NgIf
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent implements OnInit {

  isEditMode!: boolean;
  selectedUser!: UserForCreation;
  isLoading: boolean = false;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.selectedUser$.subscribe((user) => {
      if (user) {
        this.selectedUser = user;
      } else {
        this.userService.resetEditMode(); // якщо немає юзера, очистити форму
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
      this.isLoading = true;
      this.authService.signUp(user).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/Users']);
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }
}
