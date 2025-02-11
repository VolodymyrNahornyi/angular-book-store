import {Component} from '@angular/core';
import {AsyncPipe, CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Book} from "../../model/book.model";
import {SetBackgroundDirective} from "../../directives/set-background.directive";
import {DiscountService} from "../../services/discount.service";
import {BookService} from "../../services/book.service";
import {Observable} from "rxjs";

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
    SetBackgroundDirective,
    AsyncPipe
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent {

  selectedBook: Observable<Book | null>;

  constructor(private discountService: DiscountService, private bookService: BookService) {
    this.selectedBook = this.bookService.selectedBookSubject$;
  }

  getDiscount(book: Book | null){
    if (book != null)
      return this.discountService.getDiscountPercentage(book.price, book.discountPrice);
    return 0;
  }
}
