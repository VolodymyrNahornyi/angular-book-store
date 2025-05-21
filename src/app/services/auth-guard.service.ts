import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot} from "@angular/router";
import {ContactsComponent} from "../contacts/contacts.component";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanDeactivate<ContactsComponent> {

  canDeactivate(component: ContactsComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
                nextState: RouterStateSnapshot) {
    return component.canExit();
  }

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {

    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/Login']);
      return false;
    }
  }
}
