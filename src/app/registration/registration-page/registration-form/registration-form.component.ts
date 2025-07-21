import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CustomValidator} from "../../../validators/CustomValidator";
import {UserForCreation} from "../../../model/userForCreation.model";

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent implements OnInit {

  reactiveForm!: FormGroup;
  @Output() registerUser: EventEmitter<UserForCreation> = new EventEmitter<UserForCreation>();

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, CustomValidator.noSpaceAllowed]),
      lastName: new FormControl(null, [Validators.required, CustomValidator.noSpaceAllowed]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, Validators.required, CustomValidator.checkUserAllowed),
      birthday: new FormControl(null),
      gender: new FormControl('male'),
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        country: new FormControl('Ukraine', Validators.required),
        city: new FormControl(null),
        region: new FormControl(null),
        postal: new FormControl(null, Validators.required)
      })
    });
  }

  OnFormSubmitted() {
    this.registerUser.emit(this.reactiveForm.value as UserForCreation);
  }

  get firstName() {
    return this.reactiveForm.get('firstName');
  }

  get lastName() {
    return this.reactiveForm.get('lastName');
  }

  get email() {
    return this.reactiveForm.get('email');
  }

  get street() {
    return this.reactiveForm.get('address.street');
  }

  get country() {
    return this.reactiveForm.get('address.country');
  }

  get postal() {
    return this.reactiveForm.get('address.postal');
  }

  get username() {
    return this.reactiveForm.get('username');
  }

  get birthday() {
    return this.reactiveForm.get('birthday');
  }

  generateUsername() {
    const firstPart = this.firstName?.value.slice(0, 3).toLowerCase();
    const lastPart = this.lastName?.value.slice(0, 3).toLowerCase();

    let birthday = new Date(this.birthday?.value);
    const yearOfBirth = birthday.getFullYear();

    let username = `${firstPart}${lastPart}${yearOfBirth}`
    this.username?.setValue(username)
  }

}
