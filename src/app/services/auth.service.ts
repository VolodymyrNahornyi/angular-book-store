import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserForCreation} from "../model/userForCreation.model";
import {AuthResponseModel} from "../model/AuthResponseModel";
import {BehaviorSubject, tap} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticatedUser} from "../model/authenticated-user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<AuthenticatedUser | null>(null);
  user$ = this.userSubject.asObservable();

  private expireTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(user: UserForCreation) {
    let data = {email: user.email, password: user.password, returnSecureToken: true};
    return this.http.post<AuthResponseModel>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=\n' +
      'AIzaSyDkl-yk_32CDsk5lpEeQk4RawOxjr5nXM8', data);
  }

  private handleCreateAuthenticatedUser(res: AuthResponseModel) {
    const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
    const expiresIn = new Date(expiresInTs);
    const user = new AuthenticatedUser(res.email, res.localId, res.idToken, expiresIn);
    this.userSubject.next(user);
    this.autoLogOut(+res.expiresIn * 1000);

    localStorage.setItem('user', JSON.stringify(user));
  }

  autoLogin() {
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
    if (!user) {
      return
    }

    const loggedUser = new AuthenticatedUser(user.email, user.id, user._token, user._expiresIn);
    if (loggedUser.token) {
      this.userSubject.next(loggedUser);
      const timerValue = user._expiresIn.getTime() - new Date().getTime();
      this.autoLogOut(timerValue);
    }
  }

  autoLogOut(expireTime: number){
    this.expireTimer = setTimeout(() => {
      this.signOut();
    }, expireTime);
  }

  signIn(email: string, password: string){
    let data = {email: email, password: password, returnSecureToken: true};
    return this.http.post<AuthResponseModel>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=\n' +
      'AIzaSyDkl-yk_32CDsk5lpEeQk4RawOxjr5nXM8', data).pipe(
      tap((res) => {
        this.handleCreateAuthenticatedUser(res)
      })
    );
  }

  signOut() {
    this.userSubject.next(null);
    this.router.navigate(["/Login"]);
    localStorage.removeItem('user');

    if (this.expireTimer) {
      clearTimeout(this.expireTimer);
    }
    this.expireTimer = null;
  }
}
