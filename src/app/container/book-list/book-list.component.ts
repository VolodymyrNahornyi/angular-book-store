import {Component, inject, OnInit} from '@angular/core';
import {Book} from "../../model/book.model";
import {AsyncPipe, NgForOf} from "@angular/common";
import {BookComponent} from "./book/book.component";
import {FilterComponent} from "./filter/filter.component";
import {BookService} from "../../services/book.service";
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
  private bookService = inject(BookService);
  private route = inject(ActivatedRoute);

  // Напряму отримуємо сигнал з сервісу
  books = this.bookService.filteredBooks;

  ngOnInit(): void {
    // Продовжуємо слухати параметри роутера, але тепер оновлюємо сигнал
    this.route.queryParamMap.subscribe(params => {
      const searchTerm = params.get('search') || '';
      this.bookService.searchTerm.set(searchTerm);
    });
  }
}
