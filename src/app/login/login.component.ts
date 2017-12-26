import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import { User } from '../users/userDto';
import { Router } from '@angular/router';
import { MyConstants } from '../constants/my-constants';
import { LoginService } from '../services/login.service';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public title: string;
  public user: User;
  public showError = false;
  public errorText: string;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private loginService: LoginService,
    private swPush: SwPush
  ) {}

  ngOnInit() {
    this.loginService.currentUser = null;
    this.title = 'Login';
    this.user = new User();
    const token = sessionStorage.getItem(MyConstants.token);
    if (token && token.length > 0 && token !== 'null') {
      this.httpService.loginWithToken().subscribe(
        response => {
          this.loginService.setAdminFlag(response.user.role.name);
          this.loginService.setLogin(true);
          this.loginService.currentUser = response.user;          
          this.router.navigate(['users']);
        },
        (err: HttpErrorResponse) => {
          this.showErrorMsg(err);
        }
      );
    }
  }

  public login() {
    this.httpService.login(this.user).subscribe(
      response => {
        sessionStorage.setItem(MyConstants.token, response.token);
        this.loginService.setAdminFlag(response.user.role.name);
        this.loginService.setLogin(true);
        this.loginService.currentUser = response.user;        
        this.router.navigate(['users']);
      },
      (err: HttpErrorResponse) => {
        this.showErrorMsg(err);
      }
    );
  }

  private showErrorMsg(err: HttpErrorResponse): void {
    this.loginService.setLogin(false);
    this.showError = true;
    if (err.error && err.error.length > 0) {
      this.errorText = err.error;
    } else {
      this.errorText = err.message;
    }
    setTimeout(() => {
      this.showError = false;
    }, 4000);
  }

  public startPush() {
    this.subscribeToPush();
    this.pushListener();
  }

  public testPush() {
    this.httpService.sendPush().subscribe(() => {
      // TODO nothing;
    });
  }

  private subscribeToPush() {
    this.swPush
      .requestSubscription({
        serverPublicKey: MyConstants.publicSwKey
      })
      .then(pushSubscription => {
        this.updateSubscription(pushSubscription);
      })
      .catch(err => {
        console.error(err);
      });
  }

  private updateSubscription(pushSubscription: PushSubscription) {
    // Requesting messaging service to subscribe current client (browser)
    const body = {
      action: 'subscribe',
      subscription: pushSubscription
    };
    // Passing subscription object to our backend
    this.httpService.addSubscriber(body).subscribe(
      res => {
        console.log('[App] Add subscriber request answer', res);
      },
      err => {
        console.log('[App] Add subscriber request failed', err);
      }
    );
  }

  private pushListener() {
    this.swPush.messages.subscribe((message: any) => {
      console.log(JSON.stringify(message));
    });
  }

  public unsubscribe() {
    this.swPush
      .requestSubscription({
        serverPublicKey: MyConstants.publicSwKey
      })
      .then((pushSubscription: PushSubscription) => {
        if (pushSubscription) {
          const body = {
            action: 'unsubscribe',
            subscription: pushSubscription
          };
          this.httpService.addSubscriber(body).subscribe(
            res => {
              console.log('[App] Unsubscribe request answer', res);
              this.swPush.unsubscribe();
            },
            err => {
              console.log('[App] Unsubscribe request failed', err);
            }
          );
        } else {
          return;
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
}
