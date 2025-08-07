import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

import { BookDetailComponent } from './book-detail.component';
import {BookComponent} from "../book-list/book/book.component";
import {Book} from "../../model/book.model";

// 1. Створюємо тестовий хост-компонент для розміщення BookComponent.
@Component({
  standalone: true,
  imports: [BookComponent],
  template: `<app-book [book]="testBook"></app-book>`
})
class TestHostComponent {
  // Готуємо імітовані дані для передачі в BookComponent.
  testBook: Book = {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    // ... інші необхідні поля з моделі Book
    publicationYear: 1925,
    genre: 'Fiction',
    isbn: '978-0743273565',
    publisher: "Charles Scribner's Sons",
    pageCount: 180,
    language: 'English',
    summary: 'A novel set in the Jazz Age...',
    coverImage: 'url/to/image.jpg',
    rating: 4.5,
    publishedDate: new Date("1925-04-10"),
    keywords: ['classic'],
    price: 20.99,
    isAvailable: true
  };
}

describe('Book Navigation Integration Test', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostComponent,
        BookComponent,
        // 2. Налаштовуємо RouterTestingModule з маршрутами, необхідними для тесту.
        RouterTestingModule.withRoutes([
          { path: 'Books/:id', component: BookDetailComponent }
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should navigate to the book detail page on click', fakeAsync(() => {
    // 3. Знаходимо елемент, на якому висить обробник кліку (в нашому випадку це card).
    const cardElement = fixture.debugElement.query(By.css('.card'));

    // 4. Симулюємо клік по картці книги.
    cardElement.nativeElement.click();

    // 5. Чекаємо завершення асинхронної навігації.
    tick();

    // 6. Перевіряємо, що URL-адреса змінилася на очікувану.
    expect(location.path()).toBe('/Books/1');
  }));
});
