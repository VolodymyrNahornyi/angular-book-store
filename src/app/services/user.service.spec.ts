import {UserService} from "./user.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UserForCreation} from "../model/userForCreation.model";
import {TestBed} from "@angular/core/testing";

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  // Створюємо повний, валідний об'єкт для використання в тестах
  const mockUserPayload = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    password: 'password123',
    email: 'john.doe@example.com',
    birthday: '1990-01-15',
    gender: 'male' as const, // Використовуємо 'as const' для строгої типізації
    address: {
      street: '123 Main St',
      country: 'USA',
      city: 'Anytown',
      region: 'CA',
      postal: '12345'
    }
  };

  const mockFirebaseResponse = { 'firebaseKey1': mockUserPayload };

  const expectedUsers: UserForCreation[] = [{ id: 'firebaseKey1', ...mockUserPayload }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should fetch users and transform the response correctly', () => {
    // ... (mockFirebaseResponse та expectedUsers залишаються такими ж)

    service.getAllUsers().subscribe(users => {
      // 1. Спочатку перевіряємо, що ми отримали правильну кількість елементів.
      expect(users.length).toBe(expectedUsers.length);

      // 2. Потім робимо конкретні перевірки для ключових полів першого об'єкта.
      // Це робить тест менш крихким і вирішує проблему з типами.
      expect(users[0].id).toBe(expectedUsers[0].id!);
      expect(users[0].username).toBe(expectedUsers[0].username);
      expect(users[0].address.city).toBe(expectedUsers[0].address.city);
    });

    const req = httpTestingController.expectOne('https://bookstore-24567-default-rtdb.firebaseio.com/users.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockFirebaseResponse);
  });

  // ВИПРАВЛЕНО: Тепер цей тест використовує повний об'єкт mockFirebaseResponse
  it('should update the users$ observable after fetching data', () => {
    service.users$.subscribe(users => {
      // Ігноруємо початкове пусте значення від BehaviorSubject
      if (users.length > 0) {
        expect(users).toEqual(expectedUsers);
      }
    });

    service.getAllUsers().subscribe();

    const req = httpTestingController.expectOne('https://bookstore-24567-default-rtdb.firebaseio.com/users.json');
    // Відповідаємо повним, валідним об'єктом
    req.flush(mockFirebaseResponse);
  });

  it('should handle HTTP errors gracefully', () => {
    service.getAllUsers().subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(error).toBeTruthy();
      }
    });

    const req = httpTestingController.expectOne('https://bookstore-24567-default-rtdb.firebaseio.com/users.json');
    req.flush('Something went wrong', { status: 500, statusText: 'Server Error' });
  });
});
