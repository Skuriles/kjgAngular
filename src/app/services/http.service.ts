import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../users/userDto";
import { MyContants } from "../constants/my-contants";
import { Drink } from "../drinks/drink";
import { UserDrinks } from "../drinks/user-drinks";

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  public api = "api/";

  public register(user: User): any {
    const nodeUrl = this.api + "register";
    return this.postRequest(nodeUrl, user);
  }

  public login(user: User): any {
    const nodeUrl = this.api + "login";
    return this.postRequest(nodeUrl, user);
  }

  public loginWithToken(): any {
    const nodeUrl = this.api + "loginWithToken";
    return this.postAuthRequest(nodeUrl, null);
  }

  public getUsers(): any {
    const nodeUrl = this.api + 'getUserList';
    return this.postAuthRequest(nodeUrl, null);
  }

  public getRoles(): any {
    const nodeUrl = this.api + 'getRoles';
    return this.postAuthRequest(nodeUrl, null);
  }

  public updateUser(user: User): any {
    const nodeUrl = this.api + 'updateUser';
    return this.postAuthRequest(nodeUrl, user);
  }

  public updateUserDrinks(userDrink: UserDrinks): any {
    const nodeUrl = this.api + 'updateUserDrinks';
    return this.postAuthRequest(nodeUrl, userDrink);
  }

  public getDrinks(): any {
    const nodeUrl = this.api + 'getDrinks';
    return this.postAuthRequest(nodeUrl, null);
  }

  public getUserDrinks(userIds: string[]): any {
    const nodeUrl = this.api + 'getUserDrinks';
    return this.postAuthRequest(nodeUrl, userIds);
  }

  public updateDrink(drink: Drink): any {
    const nodeUrl = this.api + 'updateDrink';
    return this.postAuthRequest(nodeUrl, drink);
  }

  public deleteDrink(drink: Drink): any {
    const nodeUrl = this.api + 'deleteDrink';
    return this.postAuthRequest(nodeUrl, drink);
  }
  // default http requests
  private postRequest(nodeUrl: string, body: object) {
    return this.http.post(nodeUrl, body);
  }

  private postAuthRequest(nodeUrl: string, body: object) {
    return this.http.post(nodeUrl, body, {
      headers: new HttpHeaders().set(
        'Authorization',
        sessionStorage.getItem(MyContants.token)
      )
    });
  }
}
