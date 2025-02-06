import {Component} from '@angular/core';
import {SearchComponent} from "./search/search.component";
import {BookListComponent} from "./book-list/book-list.component";
import {BookDetailComponent} from "./book-detail/book-detail.component";
import {RecentBookListComponent} from "./recent-book-list/recent-book-list.component";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    SearchComponent,
    BookListComponent,
    BookDetailComponent,
    RecentBookListComponent
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  searchText: string = '';

  setSearchText(value: string) {
    this.searchText = value;
  }
}
