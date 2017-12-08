import { Component, OnInit } from '@angular/core';
import { User } from '../users/userDto';
import { HttpService } from '../services/http.service';
import { Drink } from '../drinks/drink';
import { UserDrinks, DrinkCounter } from '../drinks/user-drinks';
import { DrinkService } from '../services/drink.service';

@Component({
  selector: 'app-user-drinks-admin',
  templateUrl: './user-drinks-admin.component.html',
  styleUrls: ['./user-drinks-admin.component.css']
})
export class UserDrinksAdminComponent implements OnInit {
  
  public users: User[];
  public drinks: Drink[];  
  public userDrink: UserDrinks;
  public editActive = false;
  public userToEdit: User;
  public showSuccess = false;
  public showError = false;
  public errorText: string;
  public successText: string;
  public saveOk = false;  

  constructor(
    private httpService: HttpService,
    private drinkService: DrinkService
  ) { }

  public ngOnInit() {
    this.users = [];
    this.userToEdit = new User();
    this.userDrink = new UserDrinks();
    this.getUsersAndDrinks();    
  }

  private getUsersAndDrinks() {
    this.httpService.getUsers().subscribe((users: User[]) => {
      this.users = users;  
      this.httpService.getDrinks().subscribe((drinks: Drink[]) => {
        this.drinks = drinks;             
      }, (err) => {
      }); 
    }, (err) => {
    });
  }

  public editUser(user: User) {
    if (user) {
      this.userToEdit.name = user.name;
      this.userToEdit._id = user._id;        
      this.httpService.getUserDrinks([user._id]).subscribe((userDrinks: UserDrinks[])=> {      
        // always first one!
        this.buildUserDrink(userDrinks[0]);       
        this.editActive = true;   
      });     
    }    
  }

  public buildUserDrink(userDrink: UserDrinks){
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
    this.userDrink = userDrink;
  }

  public closeEdit(reload: Boolean) {
    this.editActive = false;
    this.userToEdit.name = "";
    this.userToEdit.password = "";
    this.saveOk = false;
    this.showError = false;
    this.showSuccess = false;
    if(reload){
      this.getUsersAndDrinks();
    }
  }

  public saveUser() {
    if (this.userDrink) {     
      this.httpService.updateUserDrinks(this.userDrink).subscribe(() => {
        this.showSuccess = true;
        this.successText = "Benutzer gespeichert";
        this.saveOk = true;        
      }, (err) => {
        this.showError = true;
        this.errorText = err.error;
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
}
