import { Injectable } from '@angular/core';
import { UserDrinks } from '../drinks/user-drinks';
import { HttpService } from './http.service';

@Injectable()
export class DrinkService {

  constructor(private httpService: HttpService) { }

  private buildUserDrinks(userDrinks: UserDrinks[]) {
    for (let i = 0; i < drinks.length; i++) {
      const drink = drinks[i];
      let found = false;
      for (let j = 0; j < userDrinks.length; j++) {       
        if (userDrinks[j].drink === drink._id) {
          drink.count = userDrinks[j].count;
          found = true;
          break;
        }
      }
      if (!found) {
        drink.count = 0;
      }
    } 
    return drinks;   
  }

  public getUserDrinks(drinks, user, callback){   
    this.httpService.getUserDrinks([user._id]).subscribe((userDrinks: UserDrinks[])=> {      
      return callback(this.userDrinks, user);         
    })
  }
}
