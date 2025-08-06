import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {BookService} from "../../../services/book.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  bookService = inject(BookService);
  onFilterChange(filter: 'all' | 'available' | 'outOfStock') {
    this.bookService.availabilityFilter.set(filter);
  }
}
