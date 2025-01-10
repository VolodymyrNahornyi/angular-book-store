import {Component} from '@angular/core';
import {SearchComponent} from "./search/search.component";
import {BookListComponent} from "./book-list/book-list.component";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    SearchComponent,
    BookListComponent
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
