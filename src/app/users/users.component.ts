import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { User } from './userDto';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: User[]
  public editActive = false;
  public userToEdit: User;

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
      this.userToEdit = user
    } this.editActive = true;
  }

  public closeEdit() {
    this.editActive = false;
    this.userToEdit = null;
  }

  public saveUser() {
    if (this.userToEdit) {
      this.httpService.updateUser(this.userToEdit).subscribe(()=> {

      })
    }
    this.closeEdit();
  }

}
