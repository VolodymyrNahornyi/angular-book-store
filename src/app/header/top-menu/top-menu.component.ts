import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'top-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent implements OnInit{

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) =>{
      this.isLoggedIn = !!user;
    });
  }
}
