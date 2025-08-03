import {Component, inject, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'book-store';

  authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
