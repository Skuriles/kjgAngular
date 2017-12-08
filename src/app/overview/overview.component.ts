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

  private buildUserDrink(userDrinks: UserDrinks[]){    
    for (let k = 0; k < userDrinks.length; k++) {
      const userDrink = userDrinks[k];   
    for (let i = 0; i < this.drinks.length; i++) {
     for (let j = 0; j < userDrink.drinks.length; j++) {
       let found = false:
      if(userDrink.drinks[j].drinkId === this.drinks[i]._id){
        found = true;
        break;
        }
     }
     if(!found){
       const drinkCounter = new DrinkCounter();
       drinkCounter.drinkId = this.drinks[i]._id;
       drinkCounter.drinkName = this.drinks[i].name;
       drinkCounter.count = 0;       
       userDrink.drinks.push(drinkCounter);
     }      
    }   
    this.userDrinks.push(userDrink);
     }     
  }

  private getUsersAndDrinks() {
    this.httpService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      const userIds = [];
      for (let i = 0; i < this.users.length; i++) {
        userIds.push(this.users[i]._id)        
      }
      this.httpService.getDrinks().subscribe((drinks: Drink[]) => {
        this.drinks = drinks;
        this.httpService.getUserDrinks(userIds).subscribe((userDrinks: UserDrinks[])=> {          
          this.buildUserDrink(userDrinks);                 
        }, (err) => {
        });               
    }, (err) => {
    });       
  } 
  
}
