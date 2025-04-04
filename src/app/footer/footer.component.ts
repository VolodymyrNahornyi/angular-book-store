import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }
}
