import { Routes } from '@angular/router';
import {ContainerComponent} from "./container/container.component";
import {AboutComponent} from "./about/about.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {BookDetailComponent} from "./container/book-detail/book-detail.component";

export const routes: Routes = [
  {path: '', redirectTo: 'Books', pathMatch: 'full'},
  {path: 'Books', component: ContainerComponent},
  {path: 'Books/:id', component: BookDetailComponent},
  {path: 'About', component: AboutComponent},
  {path: 'Contacts', component: ContactsComponent},
  {path: '**', component: NotFoundComponent}
];
