import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
  public isLoggedIn: boolean;
  public loginChanged = new Subject();
  public loginChanged$ = this.loginChanged.asObservable();
  constructor() {
    this.isLoggedIn = false;
  }

  public setLogin(loggedIn) {
    if (loggedIn != this.isLoggedIn) {
      this.isLoggedIn = loggedIn;
      this.loginChanged.next();
    }
  }

}
