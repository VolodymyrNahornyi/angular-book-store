import {HttpClient, HttpInterceptorFn} from "@angular/common/http";
import {inject} from "@angular/core";
import {tap} from "rxjs";

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {

  const apiUrl: string = 'https://bookstore-24567-default-rtdb.firebaseio.com/';
  const http = inject(HttpClient);

  return next(req).pipe(
    tap({
      error: (error) => {
        const logEntry = {
          timestamp: new Date().toISOString(),
          url: req.url,
          method: req.method,
          status: error.status,
          message: error.message || 'Unknown error',
          body: req.body || null
        };

        http.post(apiUrl + 'logs.json', logEntry)
          .subscribe();
      }
    })
  );
};
