import { Component, OnInit } from '@angular/core';
import { Drink } from './drink';
import { HttpService } from '../services/http.service';
import { User } from '../users/userDto';
import { DrinkService } from '../services/drink.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {

  public drinks: Drink[];
  public user: User;
  public showSuccess = false;
  public showError = false;
  public errorText: string;
  public successText: string;
  public saveOk = false;

  constructor(
    private httpService: HttpService,
    private drinkService: DrinkService,
    private loginService: LoginService
  ) { }

  public ngOnInit() {
    this.user = this.loginService.currentUser;
    this.getDrinks();
  }

  private getDrinks() {
    this.httpService.getDrinks().subscribe((drinks: Drink[]) => {
      this.drinks = drinks;
    },  (err) => {
      this.showError = true;
      this.errorText = err.body;
    });
  }

  public drinkPlus(drink: Drink) {
    // entweder drinks von user holen und updaten oder einfach online dazu zählen => erst abholen und anzeigen..
    for (let i = 0; i < this.user.drinks.length; i++) {
      if (this.user.drinks[i]._id === drink._id) {
        this.user.drinks[i].count++;
        break;
      }
    };
    this.httpService.updateUserDrinks(this.user).subscribe(
      () => {
        this.showSuccess = true;
        this.successText = "Drink gespeichert";
        this.saveOk = true;        
      }, (err) => {
        this.showError = true;
        this.errorText = err.body;
      }, ()=> {
        setTimeout(()=> {
          this.showError = false;
          this.showSuccess = false;
        },2000)
      });
  }
}
