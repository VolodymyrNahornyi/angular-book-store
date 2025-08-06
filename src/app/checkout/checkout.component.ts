import {Component, computed, inject, OnInit, signal} from '@angular/core';
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
  book = signal<Book>({} as Book);

  tax = computed(() => {
    const price = this.book().discountPrice || this.book().price || 0;
    return price * 0.1;
  });

  total = computed(() => {
    const price = this.book().discountPrice || this.book().price || 0;
    return price + this.tax();
  });

  ngOnInit(): void {
    // Встановлюємо значення сигналу
    this.book.set(history.state);
  }
}
