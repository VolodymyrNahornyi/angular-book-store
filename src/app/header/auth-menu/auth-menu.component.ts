import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'auth-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './auth-menu.component.html',
  styleUrl: './auth-menu.component.css'
})
export class AuthMenuComponent {

}
