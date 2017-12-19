import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../users/userDto';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  public title: string;
  public user: User;
  public passwordConfirm: string;
  public showError = false;
  public showSuccess = false;
  public errorMessage = '';

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.title = 'Registrieren';
    this.user = new User();
    this.passwordConfirm = '';
  }

  public register() {
    if (this.user.password.length > 0 &&
      this.user.name.length > 0 &&
      this.passwordConfirm === this.user.password) {
      this.httpService.register(this.user).subscribe(() => {
        this.showSuccess = true;
      }, (err: HttpErrorResponse) => {
        this.showError = true;
        this.errorMessage = err.error;
      });
    } else {
      this.showError = true;
      this.errorMessage = 'Registrierung fehlgeschlagen. Bitte prüfe alle Felder!';
    }
  }

}
