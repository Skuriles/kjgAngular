import { Component, OnInit } from "@angular/core";
import { LoginService } from "./services/login.service";
import { Subscription } from "rxjs/Subscription";
import { MyConstants } from "./constants/my-constants";
import { Router } from "@angular/router";
import { HttpService } from "./services/http.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  public loggedin: boolean;
  public loginChanged: Subscription;
  public openTab: number;
  public isAdmin = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private httpService: HttpService
  ) {
    this.loggedin = this.loginService.isLoggedIn;
    this.isAdmin = this.loginService.isAdmin;
  }

  public ngOnInit(): void {
    this.loginChanged = this.loginService.loginChanged$.subscribe(() => {
      this.loggedin = this.loginService.isLoggedIn;
      this.isAdmin = this.loginService.isAdmin;
      if (!this.loggedin) {
        this.openTab = null;
      }
    });
  }

  public logout() {
    sessionStorage.setItem(MyConstants.token, null);
    this.loginService.setLogin(false);
    this.loginService.currentUser = null;
    this.loginService.isAdmin = false;
    this.router.navigate(["/"]);
  }

  public showSubMenu(menu: number) {
    if (menu === this.openTab) {
      this.openTab = null;
      return;
    }
    this.openTab = menu;
  }

  public isNotPlanRoute() {
    if (this.router.url !== "/dailyPlan") {
      return "container";
    }
    return "";
  }
}
