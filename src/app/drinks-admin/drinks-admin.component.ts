import { Component, OnInit } from '@angular/core';
import { Drink } from '../drinks/drink';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-drinks-admin',
  templateUrl: './drinks-admin.component.html',
  styleUrls: ['./drinks-admin.component.css']
})
export class DrinksAdminComponent implements OnInit {

  public drinks: Drink[];
  public editDrink: Drink;
  public editActive = false;
  public showSuccess = false;
  public showError = false;
  public errorText: string;
  public successText: string;
  public saveOk = false;
  public deleteActive = false;

  constructor(
    private httpService: HttpService
  ) { }

  public ngOnInit() {
    this.editDrink = new Drink();
    this.drinks = [];
    this.httpService.getDrinks().subscribe((drinks) => {
      this.drinks = drinks;
    }, (err) => {
      // TODO error
    })
  }

  public newDrink() {
    this.editDrink = new Drink();
    this.editActive = true;
  }

  public editCurrentDrink(drink: Drink) {
    this.editDrink = new Drink();
    this.editDrink.name = drink.name;
    this.editDrink._id = drink._id;
    this.deleteActive = true;
    this.editActive = true;
  }

  public deleteDrink(){
    if (this.editDrink && this.editDrink._id && this.editDrink._id.length > 0) {
      this.httpService.deleteDrink(this.editDrink).subscribe(() => {
        this.showSuccess = true;
        this.successText = "Drink gelöscht";
        this.saveOk = true;        
      }, (err) => {
        this.showError = true;
        this.errorText = err.error;
      });
    } else {
      this.showError = true;
      this.errorText = "Fehler, bitte neu versuchen";    
    }

  }

  public closeEdit(reload) {
    this.editActive = false;
    this.editDrink.name = "";
    this.saveOk = false;
    this.showError = false;
    this.showSuccess = false;
    this.deleteActive = false;
    if(reload){
    this.httpService.getDrinks().subscribe((drinks) => {
      this.drinks = drinks;
    }, (err) => {
      // TODO error
    });}
  }

  public saveDrink() {
    if (this.editDrink && this.editDrink.name && this.editDrink.name.length > 0) {
      this.httpService.updateDrink(this.editDrink).subscribe(() => {
        this.showSuccess = true;
        this.successText = "Drink gespeichert";
        this.saveOk = true;        
      }, (err) => {
        this.showError = true;
        this.errorText = err.body;
      });
    } else {
      this.showError = true;
      this.errorText = "Eingabe Felder dürfen nicht leer sein";
    }
  }

}
