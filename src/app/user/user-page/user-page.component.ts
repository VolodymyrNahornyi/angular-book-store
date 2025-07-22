import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {UserListComponent} from "./user-list/user-list.component";
import {UserForCreation} from "../../model/userForCreation.model";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

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

  constructor(private userService: UserService, private router: Router) {
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

  onUserUpdate(id: string){
    this.isLoading = true;
    let selectedUser = this.users.find((user) => user.id === id);
    if (selectedUser) {
      this.userService.setUserEditMode(selectedUser);
    }
    this.router.navigate(['/Users/Edit']);
    this.isLoading = false;
  }

  onUserDetail(id: string) {
    this.isLoading = true;
    this.userService.getUserDetails(id).subscribe((user) => {
      this.userService.setSelectedUser(user);
      this.router.navigate(['/Users/Detail']);
      this.isLoading = false;
    });
  }
}
