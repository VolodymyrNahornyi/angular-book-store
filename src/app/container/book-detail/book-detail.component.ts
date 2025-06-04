import {Component, OnInit} from '@angular/core';
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

  selectedBook$!: Observable<Book | undefined>;
  bookId!: number;

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    // this.bookId = this.activatedRoute.snapshot.params['id']; // snapshot.params['id'] returns any type
    this.bookId = +this.activatedRoute.snapshot.paramMap.get('id')!; // paramMap.get('id') returns string | null type
    this.selectedBook$ = this.bookService.getBookById(this.bookId);
    }
}
