import {Component, OnInit} from '@angular/core';
import {Book} from "../../model/book.model";
import {AsyncPipe, NgForOf} from "@angular/common";
import {BookComponent} from "./book/book.component";
import {FilterComponent} from "./filter/filter.component";
import {BookService} from "../../services/book.service";
import {DiscountService} from "../../services/discount.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

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
export class BookListComponent implements OnInit {

  books$: Observable<Book[]> | undefined;
  searchTerm: string = '';

  constructor(private bookService: BookService, private discountService: DiscountService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.searchTerm = params.get('search') || '';
      this.bookService.setSearchText(this.searchTerm);
      this.books$ = this.bookService.getFilteredBooks(); // Одне присвоєння
    });
    }

  getDiscount(book: Book) {
    return this.discountService.getDiscountPercentage(book.price, book.discountPrice);
  }
}
