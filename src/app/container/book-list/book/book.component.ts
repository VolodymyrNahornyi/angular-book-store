import {Component, Input} from '@angular/core';
import {CurrencyPipe, DatePipe, NgClass, NgIf, NgStyle, SlicePipe} from "@angular/common";
import {Book} from "../../../model/book.model";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    NgStyle,
    NgIf,
    NgClass,
    SlicePipe,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  @Input() book!: Book;

  @Input() discount!: number;
}
