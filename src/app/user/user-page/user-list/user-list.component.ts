import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {UserForCreation} from "../../../model/userForCreation.model";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DatePipe,
    TitleCasePipe
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  @Input() users!: UserForCreation[];
  @Output() onUserDeleted: EventEmitter<string> = new EventEmitter<string>();
  @Output() onUserUpdated: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  deleteUser(id: string | undefined) {
    this.onUserDeleted.emit(id!);
  }

  updateUser(id: string | undefined){
    this.onUserUpdated.emit(id);
  }
}
