import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Book} from "../../model/book.model";
import {RecentBookComponent} from "./recent-book/recent-book.component";
import {NgForOf} from "@angular/common";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-recent-book-list',
  standalone: true,
  imports: [
    RecentBookComponent,
    NgForOf
  ],
  templateUrl: './recent-book-list.component.html',
  styleUrl: './recent-book-list.component.css'
})
export class RecentBookListComponent implements OnInit {

  recentBooks: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.recentBooks = this.bookService.getRecentBooks();
  }

  @Output()
  selectedBookEvent: EventEmitter<Book> = new EventEmitter<Book>();

  selectedBook!: Book;

  onSelectedBook(book: Book) {
    this.selectedBook = book;
    this.selectedBookEvent.emit(this.selectedBook);
  }
}
