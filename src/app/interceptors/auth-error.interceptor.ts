import {HttpInterceptorFn} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {catchError, switchMap, throwError} from "rxjs";

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        const userData = authService.getAuthenticatedUserData();

        if (!userData){
          authService.signOut();
          router.navigate(['/Login']);
        }
        const refreshToken = userData.refreshToken;

        if (refreshToken) {
          return authService.refreshAccessToken(refreshToken).pipe(
            switchMap((data) => {

              authService.setAuthenticatedUserData(data);

              const clonedRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${data.access_token}`
                }
              });

              return next(clonedRequest);
            }),
            catchError(() => {
              authService.signOut();
              router.navigate(['/Login']);
              return throwError(() => new Error('Unauthorized'));
            })
          );
        } else {
          authService.signOut();
          console.log('There is no refresh token');
          router.navigate(['/Login']);
        }
      }
      return throwError(() => error);
    })
  );
};
