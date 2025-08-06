import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import {AuthResponseModel} from "../model/AuthResponseModel";

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let mockRouter: any;

  beforeEach(() => {
    // Створюємо імітований роутер, щоб уникнути помилок, пов'язаних з навігацією.
    mockRouter = { navigate: jasmine.createSpy('navigate') };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: mockRouter } // Надаємо імітований роутер.
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Переконуємось, що не залишилося необроблених запитів.
  });

  it('should call handleCreateAuthenticatedUser and update state on successful sign-in', () => {
    const mockEmail = 'test@example.com';
    const mockPassword = 'password123';

    // 1. Готуємо імітовану відповідь від сервера.
    const mockAuthResponse: AuthResponseModel = {
      idToken: 'mock-id-token',
      email: mockEmail,
      refreshToken: 'mock-refresh-token',
      expiresIn: '3600',
      localId: 'mock-local-id'
    };

    // 2. Створюємо "шпигуна" на приватному методі, щоб перевірити його виклик.
    // Використовуємо `(service as any)` для доступу до приватного методу.
    const handleUserSpy = spyOn<any>(service, 'handleCreateAuthenticatedUser').and.callThrough();

    // 3. Викликаємо signIn і підписуємося.
    service.signIn(mockEmail, mockPassword).subscribe(response => {
      expect(response).toEqual(mockAuthResponse);
    });

    // 4. Очікуємо POST-запит на відповідний URL.
    const req = httpMock.expectOne(request => request.url.includes('signInWithPassword'));
    expect(req.request.method).toBe('POST');
    expect(req.request.body.email).toBe(mockEmail);

    // 5. "Відповідаємо" на запит нашими імітованими даними.
    req.flush(mockAuthResponse);

    // 6. Перевіряємо, що побічні ефекти були виконані.
    expect(handleUserSpy).toHaveBeenCalledWith(mockAuthResponse);

    // Перевіряємо, що user$ отримав нового користувача.
    service.user$.subscribe(user => {
      expect(user).toBeTruthy();
      expect(user?.email).toBe(mockEmail);
    });
  });

  it('should handle errors correctly and not update state', () => {
    const handleUserSpy = spyOn<any>(service, 'handleCreateAuthenticatedUser');

    // Викликаємо signIn, очікуючи на помилку.
    service.signIn('wrong@email.com', 'wrongpass').subscribe({
      next: () => fail('The request should have failed'),
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });

    const req = httpMock.expectOne(request => request.url.includes('signInWithPassword'));

    // Імітуємо відповідь з помилкою.
    req.flush('Invalid credentials', { status: 400, statusText: 'Bad Request' });

    // Переконуємось, що метод для оновлення стану НЕ був викликаний.
    expect(handleUserSpy).not.toHaveBeenCalled();
  });
});
