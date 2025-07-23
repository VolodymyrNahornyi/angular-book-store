import {HttpInterceptorFn} from "@angular/common/http";
import {inject} from "@angular/core";
import {catchError, throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";

export const notificationInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError(error => {
      toastr.error('An error occurred during the request', `Status: ${error.status}`);
      return throwError(() => error);
    })
  );
};
