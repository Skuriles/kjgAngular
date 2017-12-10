import { Injectable } from '@angular/core';
import { UserDrinks } from '../drinks/user-drinks';
import { HttpService } from './http.service';

@Injectable()
export class DrinkService {
  constructor(private httpService: HttpService) {}

  public getUserDrinks(drinks, user, callback) {
    this.httpService
      .getUserDrinks([user._id])
      .subscribe((userDrinks: UserDrinks[]) => {
        return callback(userDrinks, user);
      });
  }
}
