import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { User } from './userDto';
import { setTimeout } from 'timers';

declare const Materialize;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: User[]
  public editActive = false;
  public userToEdit: User;
  public showSuccess = false;
  public showError = false;
  public errorText: string;
  public successText: string;

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
      this.userToEdit.id = user._id;      
    } 
    this.editActive = true;
    setTimeout(()=> {
      Materialize.updateTextFields();
    },10)
    
  }

  public closeEdit() {
    this.editActive = false;
    this.userToEdit.name = "";
    this.userToEdit.password = "";
  }

  public saveUser() {
    if (this.userToEdit) {
      this.httpService.updateUser(this.userToEdit).subscribe(() => {
        this.showSuccess = true;
        this.successText = "Benutzer gespeichert";
      }, (err) => {
        this.showError = true;
        this.errorText = err.body;
      });
    }
    this.closeEdit();
  }

}
