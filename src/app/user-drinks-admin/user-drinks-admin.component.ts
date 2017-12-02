import { Component, OnInit } from '@angular/core';
import { User } from '../users/userDto';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-user-drinks-admin',
  templateUrl: './user-drinks-admin.component.html',
  styleUrls: ['./user-drinks-admin.component.css']
})
export class UserDrinksAdminComponent implements OnInit {
 
  public users: User[]
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
    this.httpService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, (err) => {
      // TODO central error handling
    })
  }

  public editUser(user: User) {
    if (user) {
      this.userToEdit.name = user.name;
      this.userToEdit._id = user._id;   
      this.userToEdit.drinks = user.drinks;   
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
    if (this.userToEdit) {
      this.httpService.updateUser(this.userToEdit).subscribe(() => {
        this.showSuccess = true;
        this.successText = "Benutzer gespeichert"; 
        this.saveOk = true;       
      }, (err) => {
        this.showError = true;
        this.errorText = err.body;
      });
    } else {
      this.showError = true;
      this.errorText = "Felder: bitte versuche es erneut";
    }    
  }

}
