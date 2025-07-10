import {AbstractControl, FormControl} from "@angular/forms";
import {delay, map, Observable, of} from "rxjs";

export class CustomValidator {

  static noSpaceAllowed(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value != null && control.value.indexOf(' ') !== -1) {
      return { noSpaceAllowed: true };
    }
    return null;
  }

  static checkUserAllowed(control: AbstractControl): Observable<{ usernameAllowed: boolean } | null> {
    const users = ['ivanpetrenko', 'olenakoval', 'tarasshevchenko', 'nataliazhuravska'];
    const username = control.value;
    return of(users.includes(username)).pipe(
      delay(3000),
      map(exists => (exists ? {usernameAllowed: true} : null))
    );
  }
}
