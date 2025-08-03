import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {LoginModel} from "../../model/login.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  @Output() loginUser: EventEmitter<LoginModel> = new EventEmitter<LoginModel>();

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLoginClicked() {
    this.loginUser.emit(this.loginForm.value as LoginModel);
  }
}
