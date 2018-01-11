import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../users/userDto";
import { MyConstants } from "../constants/my-constants";
import { Drink } from "../drinks/drink";
import { UserDrinks, UpdateDrink } from "../drinks/user-drinks";
import { Day } from "../day/day";
import { ProgramPoint } from "../program/program";
import { Job } from "../jobs/job";

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}
  
  public api = "api/";
  public pushApi = "push/";    

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
    const nodeUrl = this.api + "getUserList";
    return this.postAuthRequest(nodeUrl, null);
  }

  public deleteUser(user: User): any {
    const nodeUrl = this.api + "deleteUser";
    return this.postAuthRequest(nodeUrl, user);
  }

  public getRoles(): any {
    const nodeUrl = this.api + "getRoles";
    return this.postAuthRequest(nodeUrl, null);
  }

  public updateUser(user: User): any {
    const nodeUrl = this.api + "updateUser";
    return this.postAuthRequest(nodeUrl, user);
  }

  public updateUserDrinks(userDrink: UserDrinks): any {
    const nodeUrl = this.api + "updateUserDrinks";
    return this.postAuthRequest(nodeUrl, userDrink);
  }

  public updateUserDrink(updateDrink: UpdateDrink): any {
    const nodeUrl = this.api + "addUserDrink";
    return this.postAuthRequest(nodeUrl, updateDrink);
  }

  public getDrinks(): any {
    const nodeUrl = this.api + "getDrinks";
    return this.postAuthRequest(nodeUrl, null);
  }

  public getUserDrinks(userIds: string[]): any {
    const nodeUrl = this.api + "getUserDrinks";
    return this.postAuthRequest(nodeUrl, userIds);
  }

  public updateDrink(drink: Drink): any {
    const nodeUrl = this.api + "updateDrink";
    return this.postAuthRequest(nodeUrl, drink);
  }

  public deleteDrink(drink: Drink): any {
    const nodeUrl = this.api + "deleteDrink";
    return this.postAuthRequest(nodeUrl, drink);
  }

  public getDailyLeaders(): any {
    const nodeUrl = this.api + "getDailyLeaders";
    return this.postAuthRequest(nodeUrl, null);
  }

  public duel(user: User): any {
    const nodeUrl = this.api + "duel";
    return this.postAuthRequest(nodeUrl, user);
  }

  // program stuff
  public deleteDay(day: Day): any {
    const nodeUrl = this.api + "deleteDay";
    return this.postAuthRequest(nodeUrl, day);
  }

  public updateDay(day: Day): any {
    const nodeUrl = this.api + "updateDay";
    return this.postAuthRequest(nodeUrl, day);
  }

  public getDays(): any {
    const nodeUrl = this.api + "getDays";
    return this.postAuthRequest(nodeUrl, null);
  }

  public getProgramPoints(): any {
    const nodeUrl = this.api + "getProgramPoints";
    return this.postAuthRequest(nodeUrl, null);
  }

  public deleteProgramPoint(point: ProgramPoint): any {
    const nodeUrl = this.api + "deleteProgramPoint";
    return this.postAuthRequest(nodeUrl, point);
  }

  public updateProgramPoint(point: ProgramPoint): any {
    const nodeUrl = this.api + "updateProgramPoint";
    return this.postAuthRequest(nodeUrl, point);
  }

  public getDailyPlanEles(): any {
    const nodeUrl = this.api + "getDailyPlanEles";
    return this.postAuthRequest(nodeUrl, null);
  } 

  // job stuff

  public getJobs(): any {
    const nodeUrl = this.api + "getJobs";
    return this.postAuthRequest(nodeUrl, null);
  }

  public updateJob(job: Job): any {
    const nodeUrl = this.api + "updateJob";
    return this.postAuthRequest(nodeUrl, job);
  }

  public deleteJob(job: Job): any {
    const nodeUrl = this.api + "deleteJob";
    return this.postAuthRequest(nodeUrl, job);
  }

  public getAttachment(path: string): any {
    const nodeUrl = path;
    return this.postDownloadAuthRequest(nodeUrl, null);
  }
  
  public downloadFile(data: Response, attachment: string) {    
    const newblob = window.URL.createObjectURL(data);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(data);
      return;
    } 
   
    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    
    const link = document.createElement('a');
    link.href = newblob;
    link.download= attachment;
    link.click();
    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(newblob);
    }, 100);
    // const blob = new Blob([data], { type: data.type });
    // const url = window.URL.createObjectURL(data);
    // window.open(url, "");
  }
  // service worker
  public addSubscriber(body): any {
    const nodeUrl = this.api + "webpush";
    return this.postAuthRequest(nodeUrl, body);
  }

  public sendPush(): any {
    const nodeUrl = this.api + "send";
    return this.postAuthRequest(nodeUrl, null);
  }

  // default http requests
  private postRequest(nodeUrl: string, body: object) {
    return this.http.post(nodeUrl, body);
  }

  private postAuthRequest(nodeUrl: string, body: object) {
    return this.http.post(nodeUrl, body, {
      headers: new HttpHeaders().set(
        "Authorization",
        sessionStorage.getItem(MyConstants.token)
      )
    });
  }

  private postDownloadAuthRequest(nodeUrl: string, body: object) {
    return this.http.post(nodeUrl, body, {
      headers: new HttpHeaders().set(
        "Authorization",
        sessionStorage.getItem(MyConstants.token)
      ),
      responseType: "blob"
    });
  }
}
