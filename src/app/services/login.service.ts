import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User } from '../users/userDto';
  
@Injectable()
export class LoginService {
  public isLoggedIn: boolean;
  public currentUser: User;
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
