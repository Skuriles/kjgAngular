import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { User } from '../users/userDto';
import { Drink } from '../drinks/drink';
import { DrinkService } from '../services/drink.service';
import { UserDrinks, DrinkCounter } from '../drinks/user-drinks';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {
  public drinks: Drink[];
  public users: User[];
  public userDrinks: UserDrinks[];

  constructor(
    private httpService: HttpService,
    private drinkService: DrinkService
  ) {}

  ngOnInit() {
    this.userDrinks = [];
    this.getUsersAndDrinks();
  }

  private buildUserDrink(userDrinks: UserDrinks[]) {
    for (let k = 0; k < userDrinks.length; k++) {
      const userDrink = userDrinks[k];
      for (let i = 0; i < this.drinks.length; i++) {
        let found = false;
        for (let j = 0; j < userDrink.drinks.length; j++) {
          if (userDrink.drinks[j].drinkId === this.drinks[i]._id) {
            found = true;
            break;
          }
        }
        if (!found) {
          const drinkCounter = new DrinkCounter();
          drinkCounter.drinkId = this.drinks[i]._id;
          drinkCounter.drinkName = this.drinks[i].name;
          drinkCounter.count = 0;
          userDrink.drinks.push(drinkCounter);
        }
      }
      this.userDrinks.push(userDrink);
    }
    this.checkNotExistingUsers();
  }

  private getUsersAndDrinks() {
    this.httpService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      const userIds = [];
      for (let i = 0; i < this.users.length; i++) {
        userIds.push(this.users[i]._id);
      }
      this.httpService.getDrinks().subscribe(
        (drinks: Drink[]) => {
          this.drinks = drinks;
          this.httpService.getUserDrinks(userIds).subscribe(
            (userDrinks: UserDrinks[]) => {
              this.buildUserDrink(userDrinks);
            },
            err => {}
          );
        },
        err => {}
      );
    });
  }

  private checkNotExistingUsers() {
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      let userFound = false;
      for (let j = 0; j < this.userDrinks.length; j++) {
        const userDrink = this.userDrinks[j];
        if (userDrink.userid === user._id) {
          userFound = true;
          break;
        }
      }
      if (!userFound) {
        const newUserDrink = new UserDrinks();
        newUserDrink.userid = user._id;
        newUserDrink.userName = user.name;
        newUserDrink.drinks = [];
        for (let j = 0; j < this.drinks.length; j++) {
          const drink = this.drinks[j];
          const drinkCounter = new DrinkCounter();
          drinkCounter.count = 0;
          drinkCounter.drinkId = drink._id;
          drinkCounter.drinkName = drink.name;
          newUserDrink.drinks.push(drinkCounter);
        }
        this.userDrinks.push(newUserDrink);
      }
    }
  }
}
