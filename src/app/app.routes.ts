import { Routes } from '@angular/router';
import {ContainerComponent} from "./container/container.component";
import {AboutComponent} from "./about/about.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {BookDetailComponent} from "./container/book-detail/book-detail.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {authGuard} from "./services/auth-guard.service";
import {RegistrationPageComponent} from "./registration/registration-page/registration-page.component";
import {UserPageComponent} from "./user/user-page/user-page.component";
import {UserDetailComponent} from "./user/user-page/user-detail/user-detail.component";
import {LoginPageComponent} from "./login/login-page/login-page.component";

export const routes: Routes = [
  {path: '', redirectTo: 'Books', pathMatch: 'full'},
  {path: 'Books', component: ContainerComponent},
  {
    path: 'Books', children: [

      {path: 'Checkout', component: CheckoutComponent, canActivate: [authGuard]},
      {path: ':id', component: BookDetailComponent}
    ]
  },
  {path: 'About', component: AboutComponent},
  {path: 'Contacts', component: ContactsComponent, canDeactivate: [authGuard]},
  {path: 'Login', component: LoginPageComponent},
  {path: 'Users', component: UserPageComponent, canActivate: [authGuard]},
  {path: 'Register', component: RegistrationPageComponent},
  {path: 'Users/Edit', component: RegistrationPageComponent, canActivate: [authGuard]},
  {path: 'Users/Detail', component: UserDetailComponent, canActivate: [authGuard]},
  {path: '**', component: NotFoundComponent}
];
