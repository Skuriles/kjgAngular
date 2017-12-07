import { Component, OnInit} from '@angular/core';
import { LoginService } from './services/login.service';
import { Subscription } from 'rxjs/Subscription';
import { MyContants } from './constants/my-contants';
import { Router } from '@angular/router';

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
    private router: Router
  ) {    
    this.loggedin = this.loginService.isLoggedIn;
  }

  public ngOnInit(): void {
    this.loginChanged  = this.loginService.loginChanged$.subscribe(()=> {
      this.loggedin = this.loginService.isLoggedIn;      
    })
  }

  public logout() {   
      sessionStorage.setItem(MyContants.token, null);
      this.loginService.setLogin(false);
      this.loginService.currentUser = null;
      this.router.navigate(["/"]);
    }

    public showSubMenu(menu: number){
      if(menu === this.openTab){
        this.openTab = null;
        return;
      }
      this.openTab = menu;
    }
}
