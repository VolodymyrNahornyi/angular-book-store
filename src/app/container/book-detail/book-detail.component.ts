import {Component, Input} from '@angular/core';
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Book} from "../../model/book.model";

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    NgForOf,
    NgIf,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent {
  @Input() book!: Book;

  getDiscountPercentage(price: number, discountPrice: number | undefined) {
    if (discountPrice)
      return Math.round(100 - (discountPrice / price) * 100);

    return price;
  }
}
