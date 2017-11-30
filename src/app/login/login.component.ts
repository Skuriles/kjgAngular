import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import { User } from '../users/userDto';
import { Router } from '@angular/router';
import { MyContants } from '../constants/my-contants';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {public title: string;
  public user: User;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.title = "Login";
    this.user = new User();
    var token = sessionStorage.getItem(MyContants.token);
    if(token && token.length > 0){
      this.httpService.loginWithToken().subscribe(
        () => {
          this.loginService.setLogin(true);
          this.router.navigate(["users"]);
        },
        (err: HttpErrorResponse) => {  
          this.loginService.setLogin(false);     
          console.log(err);
        })
    }
  } 

  public login() {
    this.httpService.login(this.user).subscribe(
      (token) => {
        sessionStorage.setItem(MyContants.token, token.token);
        this.loginService.setLogin(true);
        this.router.navigate(["users"]);
      },
      (err: HttpErrorResponse) => {
        this.loginService.setLogin(false);
        console.log(err);
      })
  }
  
}
