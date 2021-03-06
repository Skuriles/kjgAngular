import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { User } from "../users/userDto";

@Injectable()
export class LoginService {
  public isLoggedIn: boolean;
  public currentUser: User;
  public loginChanged = new Subject();
  public loginChanged$ = this.loginChanged.asObservable();
  public isAdmin = false;

  constructor() {
    this.isLoggedIn = false;
  }

  public setLogin(loggedIn) {
    if (loggedIn !== this.isLoggedIn) {
      this.isLoggedIn = loggedIn;
      this.loginChanged.next();
    }
  }

  public setAdminFlag(roleName: string) {
    if (roleName === "Admin" || roleName === "SuperAdmin") {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
