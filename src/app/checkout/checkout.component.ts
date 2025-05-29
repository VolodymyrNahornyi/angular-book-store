import {Component, inject, OnInit} from '@angular/core';
import {CurrencyPipe, NgClass, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {Book} from "../model/book.model";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgClass,
    NgIf
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  router: Router = inject(Router);
  book: Book = {} as Book;

  ngOnInit(): void {
    this.book = history.state;
  }

  getTax(price: number): number {
    return price * 0.1; // Розрахунок податку як 10% від ціни
  }

  getTotal(price: number): number {
    return price + this.getTax(price); // Загальна вартість з урахуванням податку
  }
}
