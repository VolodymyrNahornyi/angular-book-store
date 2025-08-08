import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './logging.interceptor';

describe('loggingInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  const logsApiUrl = 'https://bookstore-24567-default-rtdb.firebaseio.com/logs.json';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([loggingInterceptor])),
        provideHttpClientTesting(), // ✅ замість HttpClientTestingModule
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should catch an error and send a log request to the logging API', () => {
    const testUrl = '/api/data';

    httpClient.get(testUrl).subscribe({
      error: () => { /* Очікувана помилка */ }
    });

    // 1. Емуляція помилки для основного запиту
    const originalRequest = httpMock.expectOne(testUrl);
    originalRequest.flush('Original error', { status: 500, statusText: 'Server Error' });

    // 2. Перевірка лог-запиту
    const logRequest = httpMock.expectOne(logsApiUrl);
    expect(logRequest.request.method).toBe('POST');
    expect(logRequest.request.body.status).toBe(500);

    // 3. Завершення лог-запиту
    logRequest.flush(null, { status: 200, statusText: 'OK' });
  });
});
