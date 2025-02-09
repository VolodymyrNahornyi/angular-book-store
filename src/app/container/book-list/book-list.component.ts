import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Book} from "../../model/book.model";
import {NgForOf} from "@angular/common";
import {BookComponent} from "./book/book.component";
import {FilterComponent} from "./filter/filter.component";
import {BookService} from "../../services/book.service";
import {DiscountService} from "../../services/discount.service";

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
export class BookListComponent implements OnInit, OnChanges {

  books: Book[] = [];

  @Input()
  searchText: string = '';

  selectedFilterRadioButton: string = 'all';

  constructor(private bookService: BookService, private discountService: DiscountService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchText'] && !changes['searchText'].firstChange) {
      console.log("searchText " + changes['searchText'].currentValue)
      this.getBooks();
    }
  }

  ngOnInit(): void {
    this.getBooks();
  }

  showBookDetail(book: Book) {
    this.bookService.onSelectedBook(book);
  }

  getDiscount(book: Book){
    return this.discountService.getDiscountPercentage(book.price, book.discountPrice);
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

  getSelectedFilterRadioButton(value: string) {
    this.selectedFilterRadioButton = value;
    this.getBooks();
  }

  getBooks() {
    this.bookService.getAllBooks(this.selectedFilterRadioButton, this.searchText).subscribe({
      next: (data) => this.books = data,
      error: (err) => console.log(err),
      complete: () => console.log('Books loaded successfully.')
    });
  }
}
