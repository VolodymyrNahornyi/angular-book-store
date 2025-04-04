import { Routes } from '@angular/router';
import {ContainerComponent} from "./container/container.component";
import {AboutComponent} from "./about/about.component";
import {ContactsComponent} from "./contacts/contacts.component";

export const routes: Routes = [
  {path: '', redirectTo: 'Books', pathMatch: 'full'},
  {path: 'Books', component: ContainerComponent},
  {path: 'About', component: AboutComponent},
  {path: 'Contacts', component: ContactsComponent}
];
