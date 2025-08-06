import {Component, inject, OnInit} from '@angular/core';
import {Book} from "../../model/book.model";
import {RecentBookComponent} from "./recent-book/recent-book.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {BookService} from "../../services/book.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-recent-book-list',
  standalone: true,
  imports: [
    RecentBookComponent,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './recent-book-list.component.html',
  styleUrl: './recent-book-list.component.css'
})
export class RecentBookListComponent{
  private bookService = inject(BookService);
  recentBooks = this.bookService.recentBooks;
}
