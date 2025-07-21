import {Injectable} from '@angular/core';
import {User} from "../model/user.model";
import {HttpClient} from "@angular/common/http";
import {UserForCreation} from "../model/userForCreation.model";

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

  private apiUrl: string = 'https://bookstore-24567-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {
  }

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: UserForCreation) {
    return this.http.post(this.apiUrl + 'users.json', user);
  }
}
