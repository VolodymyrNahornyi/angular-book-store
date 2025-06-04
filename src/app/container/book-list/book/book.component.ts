import {Component, inject, Input, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgClass, NgIf, NgStyle, SlicePipe} from "@angular/common";
import {Book} from "../../../model/book.model";
import {HighlightDirective} from "../../../directives/highlight.directive";
import {Router} from "@angular/router";
import {PercentagePipe} from "../../../pipes/percentage.pipe";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    NgStyle,
    NgIf,
    NgClass,
    SlicePipe,
    CurrencyPipe,
    DatePipe,
    HighlightDirective,
    PercentagePipe
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {

  @Input() book!: Book;
  @Input() discount!: number;
  bookId: number | undefined;

  router: Router = inject(Router);

  ngOnInit(): void {
      this.bookId = this.book.id;
  }

  showBookDetail() {
    this.router.navigate(['Books', this.bookId]);
  }
}
