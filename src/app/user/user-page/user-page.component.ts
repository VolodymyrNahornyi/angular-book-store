import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {UserListComponent} from "./user-list/user-list.component";
import {UserForCreation} from "../../model/userForCreation.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    NgIf,
    UserListComponent
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  users: UserForCreation[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: users => {
        this.users = users;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });

    this.userService.users$.subscribe(users => {
      this.users = users;
    });
  }

  onUserDelete(id: string): void {
    this.isLoading = true;
    this.userService.deleteUser(id).subscribe(() => {
      this.isLoading = false;
    });
  }
}
