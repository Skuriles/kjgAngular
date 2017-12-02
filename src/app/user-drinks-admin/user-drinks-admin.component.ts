import { Component, OnInit } from '@angular/core';
import { User } from '../users/userDto';
import { HttpService } from '../services/http.service';
import { Drink } from '../drinks/drink';

@Component({
  selector: 'app-user-drinks-admin',
  templateUrl: './user-drinks-admin.component.html',
  styleUrls: ['./user-drinks-admin.component.css']
})
export class UserDrinksAdminComponent implements OnInit {

  public users: User[];
  public drinks: Drink[];
  public editActive = false;
  public userToEdit: User;
  public showSuccess = false;
  public showError = false;
  public errorText: string;
  public successText: string;
  public saveOk = false;

  constructor(private httpService: HttpService) { }

  public ngOnInit() {
    this.users = [];
    this.userToEdit = new User();
    this.getUsersAndDrinks();    
  }

  private getUsersAndDrinks() {
    this.httpService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.httpService.getDrinks().subscribe((drinks: Drink[]) => {
        this.drinks = drinks;
      }, (err) => {
        // TODO central error handling
      });
    }, (err) => {
    });
  }

  public editUser(user: User) {
    if (user) {
      this.userToEdit.name = user.name;
      this.userToEdit._id = user._id;
      this.userToEdit.drinks = user.drinks;
      this.buildUserDrinks();
    }
    this.editActive = true;
  }

  public closeEdit() {
    this.editActive = false;
    this.userToEdit.name = "";
    this.userToEdit.password = "";
    this.saveOk = false;
    this.showError = false;
    this.showSuccess = false;
  }

  public saveUser() {
    if (this.userToEdit && this.drinks) {
      this.userToEdit.drinks = this.drinks;
      this.httpService.updateUserDrinks(this.userToEdit).subscribe(() => {
        this.showSuccess = true;
        this.successText = "Benutzer gespeichert";
        this.saveOk = true;
        this.getUsersAndDrinks();
      }, (err) => {
        this.showError = true;
        this.errorText = err.body;
      });
    } else {
      this.showError = true;
      this.errorText = "Felder: bitte versuche es erneut";
    }
  }

  public drinkPlus(drink) {
    drink.count++;
  }

  public drinkMinus(drink) {
    if (drink.count > 0) {
      drink.count--;
    } else {
      drink.count = 0;
    }
  }

  private buildUserDrinks() {
    for (let i = 0; i < this.drinks.length; i++) {
      const drink = this.drinks[i];
      let found = false;
      for (let j = 0; j < this.userToEdit.drinks.length; j++) {
        const userDrink = this.userToEdit.drinks[j];
        if (userDrink._id === drink._id) {
          drink.count = userDrink.count;
          found = true;
          break;
        }
      }
      if (!found) {
        drink.count = 0;
      }
    }    
  }
}
