import {Component, ComponentRef, ElementRef, inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {LoginDialogComponent} from "./login-dialog/login-dialog.component";

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
  viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((queries) => {
      const isLogout = Boolean(queries.get('logout'));
      if (isLogout) {
        this.authService.logout();
        this.showDynamicDialog('You are logged out.', 'Logout');
      }
    });
  }

  OnLoginClicked() {
    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;

    const user = this.authService.login(username, password);

    if (user === undefined) {
      this.showDynamicDialog('Username or Password is incorrect', 'Login Error');
    } else {
      this.showDynamicDialog(`Welcome ${user.username}. You are logged in.`, 'Login Success');
      setTimeout(() => {
        this.router.navigate(['/Books']);
      }, 15000); // 1.5 seconds to let the user read the message
    }
  }

  showDynamicDialog(message: string, title: string): void {
    const componentRef: ComponentRef<LoginDialogComponent> = this.viewContainerRef.createComponent(LoginDialogComponent);

    // Передача даних у діалоговий компонент
    componentRef.instance.title = title;
    componentRef.instance.message = message;

    // Реагування на подію закриття
    componentRef.instance.close.subscribe(() => {
      componentRef.destroy(); // Видаляємо інстанс компонента
    });
  }
}
