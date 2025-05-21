import {Component, OnInit} from '@angular/core';
import {AsyncPipe, CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Book} from "../../model/book.model";
import {SetBackgroundDirective} from "../../directives/set-background.directive";
import {DiscountService} from "../../services/discount.service";
import {BookService} from "../../services/book.service";
import {Observable} from "rxjs";
import {ActivatedRoute, RouterLink} from "@angular/router";

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
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {

  selectedBook$!: Observable<Book | undefined>;
  bookId!: number;

  constructor(private discountService: DiscountService, private bookService: BookService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    // this.bookId = this.activatedRoute.snapshot.params['id']; // snapshot.params['id'] returns any type
    this.bookId = +this.activatedRoute.snapshot.paramMap.get('id')!; // paramMap.get('id') returns string | null type
    this.selectedBook$ = this.bookService.getBookById(this.bookId);
    }

  getDiscount(book: Book | null){
    if (book != null)
      return this.discountService.getDiscountPercentage(book.price, book.discountPrice);
    return 0;
  }
}
