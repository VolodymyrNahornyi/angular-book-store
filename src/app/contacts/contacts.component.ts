import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  name: string = '';
  email: string = '';
  message: string = '';

  isSubmitted: boolean = false;

  OnSubmit() {
    this.isSubmitted = true;
  }

  canExit() {
    if (this.name || this.email || this.message) {
      return confirm('You have unsaved changes. Do you want to navigate away?');
    } else {
      return true;
    }
  }
}
