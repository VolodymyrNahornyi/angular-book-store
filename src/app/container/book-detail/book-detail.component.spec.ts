import { TestBed, ComponentFixture } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BookDetailComponent } from './book-detail.component';
import {BookService} from "../../services/book.service";
import {Book} from "../../model/book.model";

describe('BookDetailComponent', () => {
  let fixture: ComponentFixture<BookDetailComponent>;
  let component: BookDetailComponent;
  let bookService: BookService; // Будемо використовувати реальний сервіс, але шпигувати за ним
  let getBookByIdSpy: jasmine.Spy;

  const testBook = new Book(
    1, 'Test Book', 'Test Author', 2020, 'Fiction', '1234567890',
    'Test Publisher', 300, 'English', 'A test summary.', 'cover.jpg',
    4.5, new Date('2020-01-01'), ['test'], 100, true, 80
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetailComponent],
      providers: [
        // Надаємо реальний сервіс, щоб можна було за ним шпигувати.
        BookService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: '1' }) }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    // Інжектуємо екземпляр сервісу.
    bookService = TestBed.inject(BookService);

    // КРОК 1: Створюємо шпигуна на методі getBookById.
    // Він буде перехоплювати виклики і повертати наш тестовий сигнал.
    getBookByIdSpy = spyOn(bookService, 'getBookById').and.returnValue(signal(testBook));
  });

  it('should call getBookById with the correct id when component initializes', () => {
    // КРОК 2: Викликаємо код, який має активувати шпигуна.
    // fixture.detectChanges() запускає ngOnInit, який, у свою чергу, викликає сервіс.
    fixture.detectChanges();

    // КРОК 3: Перевіряємо шпигуна.
    // Переконуємось, що метод був викликаний з ID, отриманим з маршруту.
    expect(getBookByIdSpy).toHaveBeenCalledWith(1);
  });

  it('should render book details correctly after initialization', () => {
    // Викликаємо detectChanges, щоб компонент отримав дані та відрендерив шаблон.
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    // Перевіряємо, що дані з сигналу, який повернув наш шпигун, відобразилися в DOM.
    expect(compiled.querySelector('h2')?.textContent).toContain('Test Book');
    expect(compiled.querySelector('h5')?.textContent).toContain('Test Author');
  });
});
