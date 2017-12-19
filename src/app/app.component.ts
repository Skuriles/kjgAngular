import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Subscription } from 'rxjs/Subscription';
import { MyContants } from './constants/my-contants';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { PushNotificationsService } from 'ng-push';
import { HttpService } from './services/http.service';

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
    private pushNotifications: PushNotificationsService,
    private swPush: SwPush,
    private httpService: HttpService
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
      this.subscribeToPush();
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

  private subscribeToPush() {
        // Requesting messaging service to subscribe current client (browser)
        this.swPush.requestSubscription({
          serverPublicKey: MyContants.publicSwKey
        })
          .then(pushSubscription => {
            const body = {
              action: 'subscribe',
              subscription: pushSubscription
            }
            // Passing subscription object to our backend
            this.httpService.addSubscriber(body)
              .subscribe(

              res => {
                console.log('[App] Add subscriber request answer', res)
              },
              err => {
                console.log('[App] Add subscriber request failed', err)
              }

              )
          })
          .catch(err => {
            console.error(err);
          });

      }
}
