import {Component} from '@angular/core';
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

  totalBooks$: Observable<number>;
  availableBooks$: Observable<number>;
  outOfStockBooks$: Observable<number>;
  selectedFilter$: Observable<string>;

  constructor(private bookService: BookService) {
    this.totalBooks$ = this.bookService.totalBooks$;
    this.availableBooks$ = this.bookService.availableBooks$;
    this.outOfStockBooks$ = this.bookService.outOfStockBooks$;
    this.selectedFilter$ = this.bookService.filterSubject$;
  }

  onFilterChange(filter: string) {
    this.bookService.setFilter(filter);
  }
}
