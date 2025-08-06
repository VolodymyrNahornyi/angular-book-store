import {Component, inject, OnInit, Signal} from '@angular/core';
import {AsyncPipe, CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Book} from "../../model/book.model";
import {SetBackgroundDirective} from "../../directives/set-background.directive";
import {BookService} from "../../services/book.service";
import {Observable} from "rxjs";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {PercentagePipe} from "../../pipes/percentage.pipe";

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
    RouterLink,
    PercentagePipe
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  private bookService = inject(BookService);
  private activatedRoute = inject(ActivatedRoute);

  selectedBook!: Signal<Book | undefined>;

  ngOnInit(): void {
    const bookId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    // getBookById тепер повертає сигнал
    this.selectedBook = this.bookService.getBookById(bookId);
  }
}
