import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { authErrorInterceptor } from './auth-error.interceptor';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('authErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getAuthenticatedUserData',
      'signOut',
      'refreshAccessToken',
      'setAuthenticatedUserData'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(
          withInterceptors([authErrorInterceptor])
        ),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    httpClient = TestBed.inject(HttpClient); //  інжектимо HttpClient
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should refresh token and retry request if refreshToken is present', () => {
    const userData = { refreshToken: 'refresh123' };
    const refreshedData = { access_token: 'newToken' };

    authServiceSpy.getAuthenticatedUserData.and.returnValue(userData);
    authServiceSpy.refreshAccessToken.and.returnValue(of(refreshedData));

    httpClient.get('/test').subscribe();

    // перший запит повертає 401
    const req1 = httpMock.expectOne('/test');
    req1.flush('error', { status: 401, statusText: 'Unauthorized' });

    // має піти запит на refresh
    expect(authServiceSpy.refreshAccessToken).toHaveBeenCalledWith('refresh123');

    // після refresh має бути повторний запит з новим токеном
    const retriedReq = httpMock.expectOne('/test');
    expect(retriedReq.request.headers.get('Authorization')).toBe('Bearer newToken');
    retriedReq.flush({});
  });
});
