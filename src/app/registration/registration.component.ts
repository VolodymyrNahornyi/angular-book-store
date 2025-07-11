import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CustomValidator} from "../validators/CustomValidator";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {

  reactiveForm!: FormGroup;

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
    console.log(this.reactiveForm);
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
