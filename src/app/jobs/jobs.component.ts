import { Component, OnInit } from "@angular/core";
import { HttpService } from "../services/http.service";
import { Job } from "./job";

declare const M;
@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html"
})
export class JobsComponent implements OnInit {
  public jobToEdit: Job;
  public jobs: Job[];
  public editActive = false;

  public showSuccess = false;
  public showError = false;
  public errorText: string;
  public successText: string;
  public saveOk = false;
  public deleteActive = false;
  public clicked = null;
  public newPerson = "";
  public newMaterial = "";
  public newMaterialActive = false;
  public newPersonActive = false;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.getJobs();
    this.jobToEdit = new Job();
  }

  private getJobs() {
    this.httpService.getJobs().subscribe(
      jobs => {
        this.jobs = jobs;
      },
      err => {
        console.log(err);
      }
    );
  }
  public editJob(job: Job) {
    if (job) {
      this.jobToEdit = job;
    } else {
      this.jobToEdit = new Job();
    }
    this.editActive = true;
    this.deleteActive = true;
    setTimeout(() => {
      M.updateTextFields();
    }, 1);
  }
  public closeEdit(reload) {
    this.editActive = false;
    this.jobToEdit = new Job();
    this.saveOk = false;
    this.deleteActive = false;
    this.showError = false;
    this.showSuccess = false;
    this.clicked = null;
    if (reload) {
      this.getJobs();
    }
  }

  public saveJob() {
    if (this.jobToEdit) {
      this.httpService.updateJob(this.jobToEdit).subscribe(
        () => {
          this.showSuccess = true;
          this.successText = "Job gespeichert";
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

  public deleteJOb() {
    if (
      this.jobToEdit &&
      this.jobToEdit._id &&
      this.jobToEdit._id.length > 0
    ) {
      this.httpService.deleteJob(this.jobToEdit).subscribe(
        () => {
          this.showSuccess = true;
          this.successText = "Job gelöscht";
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

  public isClicked(index: number) {
    if (this.clicked === index) {
      return "block";
    } else {
      return "none";
    }
  }

  public setClicked(index: number) {
    if (this.clicked === index) {
      this.clicked = null;
    } else {
      this.clicked = index;
    }
  } 

  public savePerson() {
    this.jobToEdit.persons.push(this.newPerson);
  }

  public removePerson(job: string) {
    const index = this.jobToEdit.persons.indexOf(job);
    if (index !== -1) {
      this.jobToEdit.persons.splice(index, 1);
    }
  }
}
