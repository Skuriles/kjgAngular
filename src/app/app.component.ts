import { Component, OnInit } from "@angular/core";
import { LoginService } from "./services/login.service";
import { Subscription } from "rxjs/Subscription";
import { MyConstants } from "./constants/my-constants";
import { Router } from "@angular/router";
import { PushNotificationsService } from "ng-push";
import { HttpService } from "./services/http.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  public loggedin: boolean;
  public loginChanged: Subscription;
  public openTab: number;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private pushNotifications: PushNotificationsService,    
    private httpService: HttpService
  ) {
    this.loggedin = this.loginService.isLoggedIn;
  }

  public ngOnInit(): void {
    this.loginChanged = this.loginService.loginChanged$.subscribe(() => {
      this.loggedin = this.loginService.isLoggedIn;
    });
     this.pushNotifications.requestPermission();    
  }

  public logout() {
    sessionStorage.setItem(MyConstants.token, null);
    this.loginService.setLogin(false);
    this.loginService.currentUser = null;
    this.router.navigate(["/"]);
  }

  public showSubMenu(menu: number) {
    if (menu === this.openTab) {
      this.openTab = null;
      return;
    }
    this.openTab = menu;
  }  
}
