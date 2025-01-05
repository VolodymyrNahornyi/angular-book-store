import { Component } from '@angular/core';
import {TopMenuComponent} from "./top-menu/top-menu.component";
import {AuthMenuComponent} from "./auth-menu/auth-menu.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TopMenuComponent,
    AuthMenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
