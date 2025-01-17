import {Component, Input} from '@angular/core';
import {Book} from "../../../model/book.model";
import {CurrencyPipe, NgClass, NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-recent-book',
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    CurrencyPipe,
    NgIf
  ],
  templateUrl: './recent-book.component.html',
  styleUrl: './recent-book.component.css'
})
export class RecentBookComponent {
  @Input()
  book!: Book;

  openBookDetailModal() {
    const modalElement = document.getElementById('bookDetailModal');
    const modalInstance = new (window as any).bootstrap.Modal(modalElement);
    modalInstance.show();
  }
}
