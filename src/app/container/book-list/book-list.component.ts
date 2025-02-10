import {Component, OnInit} from '@angular/core';
import {Book} from "../../model/book.model";
import {AsyncPipe, NgForOf} from "@angular/common";
import {BookComponent} from "./book/book.component";
import {FilterComponent} from "./filter/filter.component";
import {BookService} from "../../services/book.service";
import {DiscountService} from "../../services/discount.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    NgForOf,
    BookComponent,
    FilterComponent,
    AsyncPipe
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {

  books$: Observable<Book[]>;

  constructor(private bookService: BookService, private discountService: DiscountService) {
    this.books$ = this.bookService.getFilteredBooks()
  }

  showBookDetail(book: Book) {
    this.bookService.onSelectedBook(book);
  }

  getDiscount(book: Book) {
    return this.discountService.getDiscountPercentage(book.price, book.discountPrice);
  }
}
