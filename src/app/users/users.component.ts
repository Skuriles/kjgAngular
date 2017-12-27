import { Component, OnInit } from "@angular/core";
import { HttpService } from "../services/http.service";
import { User } from "./userDto";
import { Role } from "./role";

declare const M;

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  public users: User[];
  public editActive = false;
  public userToEdit: User;
  public showSuccess = false;
  public showError = false;
  public errorText: string;
  public successText: string;
  public saveOk = false;
  public roles: Role[];
  public selectedRole: Role;
  public deleteActive = false;

  constructor(private httpService: HttpService) {}

  public ngOnInit() {
    this.users = [];
    this.userToEdit = new User();
    this.getUsersAndRoles();
  }

  private getUsersAndRoles() {
    this.httpService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        this.httpService.getRoles().subscribe(
          (roles: Role[]) => {
            this.roles = roles;
          },
          err => {
            // TODO central error handling
          }
        );
      },
      err => {}
    );
  }

  public setRole(role: string) {
    for (let i = 0; i < this.roles.length; i++) {
      if (role === this.roles[i]._id) {
        return this.roles[i];
      }
    }
    return null;
  }

  public isSelectedRole(role: Role) {
    if (this.selectedRole) {
      return this.selectedRole._id === role._id;
    }
    return false;
  }

  public changeRole(role: Role) {
    for (let i = 0; i < this.roles.length; i++) {
      if (role._id === this.roles[i]._id) {
        this.selectedRole = this.roles[i];
      }
    }
    return null;
  }

  public editUser(user: User) {
    if (user) {
      this.userToEdit.name = user.name;
      this.userToEdit._id = user._id;
      this.selectedRole = this.setRole(user.role);
    }
    this.editActive = true;
    this.deleteActive = true;
  }

  public closeEdit(reload) {
    this.editActive = false;
    this.userToEdit.name = "";
    this.userToEdit.password = "";
    this.saveOk = false;
    this.deleteActive = false;
    this.showError = false;
    this.showSuccess = false;
    if (reload) {
      this.getUsersAndRoles();
    }
  }

  public saveUser() {
    if (this.userToEdit) {
      if (this.selectedRole) {
        this.userToEdit.role = this.selectedRole._id;
      }
      this.httpService.updateUser(this.userToEdit).subscribe(
        () => {
          this.showSuccess = true;
          this.successText = "Benutzer gespeichert";
          this.saveOk = true;
        },
        err => {
          this.showError = true;
          this.errorText = err.error;
        }
      );
    } else {
      this.showError = true;
      this.errorText = "Eingabe Felder dürfen nicht leer sein";
    }
  }

  public deleteUser() {
    if (
      this.userToEdit &&
      this.userToEdit._id &&
      this.userToEdit._id.length > 0
    ) {
      this.httpService.deleteUser(this.userToEdit).subscribe(
        () => {
          this.showSuccess = true;
          this.successText = "Benutzer gelöscht";
          this.saveOk = true;
        },
        err => {
          this.showError = true;
          this.errorText = err.error;
        }
      );
    } else {
      this.showError = true;
      this.errorText = "Fehler, bitte neu versuchen";
    }
  }
}
