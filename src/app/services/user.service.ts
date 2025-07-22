import {Injectable} from '@angular/core';
import {User} from "../model/user.model";
import {HttpClient} from "@angular/common/http";
import {UserForCreation} from "../model/userForCreation.model";
import {BehaviorSubject, map, tap} from "rxjs";

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

  private usersSubject = new BehaviorSubject<UserForCreation[]>([]);
  users$ = this.usersSubject.asObservable();

  private selectedUserSubject = new BehaviorSubject<UserForCreation | null>(null);
  selectedUser$ = this.selectedUserSubject.asObservable();

  private isEditModeSubject = new BehaviorSubject<boolean>(false);
  isEditMode$ = this.isEditModeSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  setUserEditMode(user: UserForCreation) {
    this.selectedUserSubject.next(user);
    this.isEditModeSubject.next(!!user);
  }

  resetEditMode() {
    this.isEditModeSubject.next(false);
  }

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: UserForCreation) {
    return this.http.post<{name: string}>(this.apiUrl + 'users.json', user).pipe(
      tap(() => {
        const currentUsers = this.usersSubject.getValue();
        this.usersSubject.next([...currentUsers, user]);
      })
    );
  }

  getAllUsers() {
    return this.http.get<{[key: string] : UserForCreation}>(this.apiUrl + 'users.json').pipe(
      map(response => {
        // Перетворення об'єкта на масив
        return Object.keys(response).map(key => ({ ...response[key], id: key }));
      }),
      tap(users => this.usersSubject.next(users)) // Оновлюємо стан
    );
  }

  deleteUser(id: string | undefined) {
    return this.http.delete(this.apiUrl + 'users/' + id + '.json').pipe(
      tap(() => {
        const currentUsers = this.usersSubject.getValue().filter(user => user.id !== id);
        this.usersSubject.next(currentUsers);
      })
    );
  }

  updateUser(id: string | undefined,  user: UserForCreation)  {
    return this.http.put(this.apiUrl + 'users/' + id + '.json', user).pipe(
      tap(() => {
        const currentUsers = this.usersSubject.getValue();
        const updatedUsers = currentUsers.map(u => u.id === id ? { ...user, id } : u);
        this.usersSubject.next(updatedUsers);
      })
    );
  }
}
