import {Component} from '@angular/core';
import {SearchComponent} from "./search/search.component";
import {BookListComponent} from "./book-list/book-list.component";
import {BookDetailComponent} from "./book-detail/book-detail.component";
import {Book} from "../model/book.model";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    SearchComponent,
    BookListComponent,
    BookDetailComponent
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  searchText: string = '';
  selectedBook!: Book;

  setSearchText(value: string) {
    this.searchText = value;
  }

  setSelectedBook(value: Book) {
    this.selectedBook = value;
  }
}
