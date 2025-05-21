import { Routes } from '@angular/router';
import {ContainerComponent} from "./container/container.component";
import {AboutComponent} from "./about/about.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {BookDetailComponent} from "./container/book-detail/book-detail.component";
import {LoginComponent} from "./login/login.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {AuthGuardService} from "./services/auth-guard.service";

export const routes: Routes = [
  {path: '', redirectTo: 'Books', pathMatch: 'full'},
  {path: 'Books', component: ContainerComponent},
  {
    path: 'Books', children: [

      {path: 'Checkout', component: CheckoutComponent, canActivate: [AuthGuardService]},
      {path: ':id', component: BookDetailComponent}
    ]
  },
  {path: 'About', component: AboutComponent},
  {path: 'Contacts', component: ContactsComponent, canDeactivate: [AuthGuardService]},
  {path: 'Login', component: LoginComponent},
  {path: '**', component: NotFoundComponent}
];
