import {Component, OnInit} from '@angular/core';
import {DatePipe, NgIf, TitleCasePipe} from "@angular/common";
import {UserForCreation} from "../../../model/userForCreation.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    TitleCasePipe
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {

  user?: UserForCreation;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.selectedUser$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

}
