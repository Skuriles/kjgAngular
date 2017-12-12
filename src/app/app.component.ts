import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Subscription } from 'rxjs/Subscription';
import { MyContants } from './constants/my-contants';
import { Router } from '@angular/router';
import { PushNotificationsService } from 'ng-push';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public loggedin: boolean;
  public loginChanged: Subscription;
  public openTab: number;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private pushNotifications: PushNotificationsService
  ) {
    this.loggedin = this.loginService.isLoggedIn;
  }

  public ngOnInit(): void {
    this.loginChanged = this.loginService.loginChanged$.subscribe(() => {
      this.loggedin = this.loginService.isLoggedIn;
    });
    this.pushNotifications.requestPermission();
    this.pushNotifications
      .create('Test', { body: 'something' })
      .subscribe(res => console.log(res), err => console.log(err));
  }

  public logout() {
    sessionStorage.setItem(MyContants.token, null);
    this.loginService.setLogin(false);
    this.loginService.currentUser = null;
    this.router.navigate(['/']);
  }

  public showSubMenu(menu: number) {
    if (menu === this.openTab) {
      this.openTab = null;
      return;
    }
    this.openTab = menu;
  }
}
