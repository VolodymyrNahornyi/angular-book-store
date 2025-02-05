import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../../model/book.model";
import {NgForOf} from "@angular/common";
import {BookComponent} from "./book/book.component";
import {FilterComponent} from "./filter/filter.component";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    NgForOf,
    BookComponent,
    FilterComponent
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {

  books: Book[] = [];

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.books = this.bookService.getAllBooks();
  }

  @Input() searchText: string = '';

  @Output()
  selectedBookEvent: EventEmitter<Book> = new EventEmitter<Book>();

  selectedBook!: Book;

  onSelectedBook(book: Book) {
    this.selectedBook = book;
    this.selectedBookEvent.emit(this.selectedBook);
  }

  getDiscountPercentage(price: number, discountPrice: number | undefined) {
    if (discountPrice)
      return Math.round(100 - (discountPrice / price) * 100);

    return price;
  }

  getAllBooksCount() {
    return this.books.length;
  }

  getBooksAvailableInStockCount() {
    return this.books.filter(b => b.isAvailable).length;
  }

  getBooksNotInStockCount() {
    return this.books.filter(b => !b.isAvailable).length;
  }

  selectedFilterRadioButton: string = 'all';

  getSelectedFilterRadioButton(value: string) {
    this.selectedFilterRadioButton = value;
  }

  get filteredAndSearchedBooks() {
    return this.books
      .filter(book => {
        // Фільтрація по радіокнопках
        if (this.selectedFilterRadioButton === 'available') {
          return book.isAvailable;
        } else if (this.selectedFilterRadioButton === 'outOfStock') {
          return !book.isAvailable;
        }
        return true; // Повернути всі книги, якщо вибрано "all"
      })
      .filter(book => {
        // Пошук по заголовку
        return book.title.toLowerCase().includes(this.searchText.toLowerCase());
      });
  }
}
