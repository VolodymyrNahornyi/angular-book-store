import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchText: string = '';

  constructor(private bookService: BookService) {
  }

  setSearchText(searchText: string) {
    this.bookService.setSearchText(searchText);
  }
}
