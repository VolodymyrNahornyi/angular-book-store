import {Component, Input} from '@angular/core';
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Book} from "../../model/book.model";
import {SetBackgroundDirective} from "../../directives/set-background.directive";
import {DiscountService} from "../../services/discount.service";

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    NgForOf,
    NgIf,
    CurrencyPipe,
    DatePipe,
    SetBackgroundDirective
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent {
  @Input() book!: Book;

  constructor(private discountService: DiscountService) {}

  getDiscount(book: Book){
    return this.discountService.getDiscountPercentage(book.price, book.discountPrice);
  }
}
