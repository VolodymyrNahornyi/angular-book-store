import {Injectable} from '@angular/core';
import {User} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {id: 1, name: 'ivan_petrenko', username: 'ivanpetrenko', password: 'parol123'},
    {id: 2, name: 'olena_koval', username: 'olenakoval', password: 'mypass456'},
    {id: 3, name: 'taras_shevchenko', username: 'tarasshevchenko', password: 'slovo789'},
    {id: 4, name: 'natalia_zhuravska', username: 'nataliazhuravska', password: 'bezpeka321'}
  ];

  constructor() {
  }

  getUsers(): User[] {
    return this.users;
  }

}
