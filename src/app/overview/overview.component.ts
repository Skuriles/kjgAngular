import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { User } from '../users/userDto';
import { Drink } from '../drinks/drink';
import { DrinkService } from '../services/drink.service';
import { UserDrinks } from '../drinks/user-drinks';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public drinks: Drink[];
  public users: User[];
  public userDrinks: UserDrinks[];

  constructor(
    private httpService: HttpService,
    private drinkService: DrinkService
  ) { }

  ngOnInit() {
    this.userDrinks = [];
    this.getUsersAndDrinks();
  }

  private getUsersAndDrinks() {
    this.httpService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.httpService.getDrinks().subscribe((drinks: Drink[]) => {
        this.drinks = drinks;
        this.buildDrinkOverview();
      }, (err) => {
      });
    }, (err) => {
    });
  }

  private buildDrinkOverview() {
    for (let i = 0; i < this.users.length; i++) {
      this.drinkService.getUserDrinks(this.drinks, this.users[i], (drinks, user) => this.addUserDrinks(drinks, user));
    }    
  }

  private addUserDrinks(drinks: Drink[], user: User) {
    for (let i = 0; i < this.users.length; i++) {
      if (user._id === this.users[i]._id) {
        this.users[i].drinks = drinks;
      }
    }
  }
}
