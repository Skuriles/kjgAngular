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
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.users = [];
    this.httpService.getUsers().subscribe((users: User[])=> {
      this.users = users;
    }, (err)=> {
      // TODO central error handling
    })
  }

}
