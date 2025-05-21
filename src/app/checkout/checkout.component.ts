import { Component } from '@angular/core';
import {CurrencyPipe, NgClass, NgIf} from "@angular/common";

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
export class CheckoutComponent {

  getTax(price: number): number {
    return price * 0.1; // Розрахунок податку як 10% від ціни
  }

  getTotal(price: number): number {
    return price + this.getTax(price); // Загальна вартість з урахуванням податку
  }
}
