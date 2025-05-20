import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  @ViewChild('username') username!: ElementRef;
  @ViewChild('password') password!: ElementRef;

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((queries) => {
      const isLogout = Boolean(queries.get('logout'));
      if (isLogout) {
        this.authService.logout();
        alert('You are logged out.');
      }
    });
  }

  OnLoginClicked() {
    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;

    const user = this.authService.login(username, password);

    if (user === undefined) {
      alert('Username or Password is incorrect');
    } else {
      alert('Welcome ' + user.username + '. You are logged in.');
      this.router.navigate(['/Books']);
    }
  }
}
