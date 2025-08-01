import {HttpErrorResponse, HttpInterceptorFn} from "@angular/common/http";
import {inject} from "@angular/core";
import {catchError, throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";

export const notificationInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';

      if (!error.error || !error.error.error) {
        return throwError(() => new Error(errorMessage));
      }

      switch (error.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists.';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'This operation is not allowed.';
          break;
      }
      toastr.error(errorMessage);
      return throwError(() => errorMessage);
    })
  );
};
