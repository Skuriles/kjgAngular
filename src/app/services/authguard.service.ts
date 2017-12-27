import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { LoginService } from "./login.service";

@Injectable()
export class AuthguardService implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.loginService.isLoggedIn) {
      if (
        route.url[0].path === "users" ||
        route.url[0].path === "userDrinkAdmin" ||
        route.url[0].path === "drinksAdmin"
      ) {
        return this.loginService.isAdmin;
      }
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }

  constructor(private router: Router, private loginService: LoginService) {}
}
