import {Component, OnInit} from '@angular/core';
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
export class FilterComponent implements OnInit {

  totalBooks$: Observable<number>;
  availableBooks$: Observable<number>;
  outOfStockBooks$: Observable<number>;

  constructor(private bookService: BookService) {
    this.totalBooks$ = this.bookService.totalBooks$;
    this.availableBooks$ = this.bookService.availableBooks$;
    this.outOfStockBooks$ = this.bookService.outOfStockBooks$;
  }

  selectedFilterRadioButton: string = 'all';

  ngOnInit(): void {
    this.bookService.filterSubject$.subscribe(filter => {
      this.selectedFilterRadioButton = filter
    });
  }

  onFilterChange(filter: string) {
    this.selectedFilterRadioButton = filter;
    this.bookService.setFilter(filter);
  }
}
