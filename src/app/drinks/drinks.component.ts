import { Component, OnInit } from '@angular/core';
import { Drink } from './drink';
import { HttpService } from '../services/http.service';
import { User } from '../users/userDto';
import { DrinkService } from '../services/drink.service';
import { LoginService } from '../services/login.service';
import { UserDrinks, DrinkCounter, UpdateDrink } from './user-drinks';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html'
})
export class DrinksComponent implements OnInit {
  public drinks: Drink[];
  public userDrink: UserDrinks;
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
  ) {}

  public ngOnInit() {
    this.user = this.loginService.currentUser;
    this.getDrinks();
  }

  private getDrinks() {
    this.httpService.getDrinks().subscribe(
      (drinks: Drink[]) => {
        this.drinks = drinks;
        this.httpService.getUserDrinks([this.user._id]).subscribe(
          (userDrinks: UserDrinks[]) => {
            if (userDrinks && userDrinks.length > 0) {
              this.userDrink = userDrinks[0];
            } else {
              this.userDrink = new UserDrinks();
            }
            this.checkUserDrinks();
          },
          err => {
            this.showError = true;
            this.errorText = err.body;
          }
        );
      },
      err => {
        this.showError = true;
        this.errorText = err.body;
      }
    );
  }

  public drinkChange(drink: DrinkCounter, add: boolean) {
    const updateDrink = new UpdateDrink(this.userDrink.userid, drink, add);
    this.httpService.updateUserDrink(updateDrink).subscribe(
      () => {
        this.showSuccess = true;
        this.successText = 'Drink gespeichert';
        this.saveOk = true;
      },
      err => {
        this.showError = true;
        this.errorText = err.body;
      },
      () => {
        setTimeout(() => {
          this.showError = false;
          this.showSuccess = false;
        }, 2000);
      }
    );
  }

  private checkUserDrinks(): any {
    for (let i = 0; i < this.drinks.length; i++) {
      const drink = this.drinks[i];
      let found = false;
      for (let j = 0; j < this.userDrink.drinks.length; j++) {
        const userDrink = this.userDrink.drinks[j];
        if (drink._id === userDrink.drinkId) {
          found = true;
          break;
        }
      }
      if (!found) {
        const drinkCounter = new DrinkCounter();
        drinkCounter.count = 0;
        drinkCounter.drinkId = drink._id;
        drinkCounter.drinkName = drink.name;
        this.userDrink.drinks.push(drinkCounter);
      }
    }
  }
}
