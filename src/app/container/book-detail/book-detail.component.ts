import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Book} from "../../model/book.model";
import {SetBackgroundDirective} from "../../directives/set-background.directive";
import {DiscountService} from "../../services/discount.service";
import {BookService} from "../../services/book.service";

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
export class BookDetailComponent implements OnInit {

  constructor(private discountService: DiscountService, private bookService: BookService) {}

  selectedBook: Book | undefined;

  ngOnInit(): void {
    this.bookService.selectedBookEvent.subscribe((book: Book) => {
      this.selectedBook = book;
    })
  }

  getDiscount(book: Book | undefined){
    if (book != undefined)
      return this.discountService.getDiscountPercentage(book.price, book.discountPrice);
    return 0;
  }
}
