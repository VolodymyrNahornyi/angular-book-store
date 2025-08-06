import { TestBed } from '@angular/core/testing';
import { Router, CanActivateFn, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthenticatedUser } from '../model/authenticated-user.model';
import {authGuard} from "./auth-guard.service"; // Припускаємо, що модель тут

describe('authGuard', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockUserSubject: BehaviorSubject<AuthenticatedUser | null>;

  // Огортаємо виконання гарда у функцію для зручності
  const executeGuard = (): Observable<boolean | UrlTree> => {
    return TestBed.runInInjectionContext(() => authGuard({} as any, {} as any)) as Observable<boolean | UrlTree>;
  };

  beforeEach(() => {
    // 1. Створюємо імітовані (mock) сервіси.
    mockUserSubject = new BehaviorSubject<AuthenticatedUser | null>(null);
    mockAuthService = jasmine.createSpyObj('AuthService', [], { user$: mockUserSubject.asObservable() });
    mockRouter = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        // 2. Надаємо наші імітовані сервіси замість справжніх.
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    });
  });

  it('should allow access for an authenticated user', (done) => {
    // ВИПРАВЛЕНО: Додано п'ятий аргумент для refreshToken
    const mockUser = new AuthenticatedUser(
      'test@test.com',
      'id1',
      'valid-token',
      new Date(Date.now() + 3600000), // expiresIn
      'mock-refresh-token' // refreshToken
    );

    mockUserSubject.next(mockUser);

    executeGuard().subscribe(result => {
      expect(result).toBe(true);
      done();
    });
  });

  it('should redirect an unauthenticated user to the login page', (done) => {
    // 5. Готуємо сценарій: користувач не залогінений.
    mockUserSubject.next(null);
    // Налаштовуємо імітований роутер повертати UrlTree при виклику createUrlTree
    const urlTree = new UrlTree(); // Створюємо dummy UrlTree для перевірки
    mockRouter.createUrlTree.and.returnValue(urlTree);

    executeGuard().subscribe(result => {
      // 6. Перевіряємо, що гард повернув UrlTree.
      expect(result).toBe(urlTree);
      // Переконуємось, що роутер був викликаний для перенаправлення на /Login.
      expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/Login']);
      done();
    });
  });

  it('should redirect a user without a valid token', (done) => {
    // 7. Готуємо сценарій: користувач існує, але його токен невалідний.
    const mockUserWithoutToken = { token: null } as any; // Спрощений об'єкт для тесту
    mockUserSubject.next(mockUserWithoutToken);
    const urlTree = new UrlTree();
    mockRouter.createUrlTree.and.returnValue(urlTree);

    executeGuard().subscribe(result => {
      expect(result).toBe(urlTree);
      expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/Login']);
      done();
    });
  });
});
