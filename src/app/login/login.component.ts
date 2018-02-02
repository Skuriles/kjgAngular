import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { HttpService } from "../services/http.service";
import { User } from "../users/userDto";
import { Router } from "@angular/router";
import { MyConstants } from "../constants/my-constants";
import { LoginService } from "../services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
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
  ) {}

  ngOnInit() {
    this.loginService.currentUser = null;
    this.title = "Login";
    this.user = new User();
    const token = sessionStorage.getItem(MyConstants.token);
    if (token && token.length > 0 && token !== "null") {
      this.httpService.loginWithToken().subscribe(
        response => {
          this.loginService.setAdminFlag(response.user.role.name);
          this.loginService.setLogin(true);
          this.loginService.currentUser = response.user;
          this.router.navigate(["overview"]);
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
        this.router.navigate(["overview"]);
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
}
