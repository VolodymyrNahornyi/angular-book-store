import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {routes} from "./app/app.routes";
import {provideRouter} from "@angular/router";
import {loggingInterceptor} from "./app/interceptors/logging.interceptor";
import {provideAnimations} from "@angular/platform-browser/animations";
import {importProvidersFrom} from "@angular/core";
import {ToastrModule} from "ngx-toastr";
import {notificationInterceptor} from "./app/interceptors/notification.interceptor";

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([loggingInterceptor, notificationInterceptor])),
    provideAnimations(),
    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 30000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      })
    )
  ],
})
  .catch((err) => console.error(err));
