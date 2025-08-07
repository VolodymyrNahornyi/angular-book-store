import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import {BookListComponent} from "../book-list.component";
import {FilterComponent} from "./filter.component";
import {BookService} from "../../../services/book.service";
import {BookComponent} from "../book/book.component";
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {of} from "rxjs";

// 1. Створюємо тестовий хост-компонент, який об'єднує компоненти фільтра та списку.
@Component({
  standalone: true,
  imports: [FilterComponent, BookListComponent],
  template: `
    <app-filter></app-filter>
    <app-book-list></app-book-list>
  `
})
class TestHostComponent {}

describe('Book Filtering Integration Test', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostElement: HTMLElement;
  let bookService: BookService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, BookComponent],
      providers: [
        BookService,
        // 2. Надаємо імітовану версію ActivatedRoute.
        {
          provide: ActivatedRoute,
          useValue: {
            // Імітуємо queryParamMap як Observable, що повертає порожні параметри.
            queryParamMap: of(convertToParamMap({}))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostElement = fixture.nativeElement;
    bookService = TestBed.inject(BookService);
    fixture.detectChanges();
  });

  // ... (решта коду тесту залишається без змін)

  it('should display all books initially', () => {
    const totalBooksInService = bookService.books.length;
    const renderedBooks = hostElement.querySelectorAll('app-book');
    expect(renderedBooks.length).toBe(totalBooksInService);
  });

  it('should display only available books when "Is Available" filter is clicked', () => {
    const availableFilterRadio: HTMLInputElement | null = hostElement.querySelector('#showAvailable');
    availableFilterRadio!.click();
    fixture.detectChanges();

    const expectedAvailableCount = bookService.books.filter(b => b.isAvailable).length;
    const renderedBooks = hostElement.querySelectorAll('app-book');

    expect(renderedBooks.length).toBe(expectedAvailableCount);
    expect(bookService.availabilityFilter()).toBe('available');
  });

  it('should display only out of stock books when "Out Of Stock" filter is clicked', () => {
    const outOfStockFilterRadio: HTMLInputElement | null = hostElement.querySelector('#showOutOfStock');
    outOfStockFilterRadio!.click();
    fixture.detectChanges();

    const expectedOutOfStockCount = bookService.books.filter(b => !b.isAvailable).length;
    const renderedBooks = hostElement.querySelectorAll('app-book');

    expect(renderedBooks.length).toBe(expectedOutOfStockCount);
    expect(bookService.availabilityFilter()).toBe('outOfStock');
  });
});
