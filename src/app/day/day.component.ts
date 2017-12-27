import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { HttpService } from "../services/http.service";
import { Day } from "./day";
declare const M;

@Component({
  selector: "app-day",
  templateUrl: "./day.component.html"
})
export class DayComponent implements OnInit {
  @ViewChild("datepicker") datePicker: ElementRef;
  public editActive = false;
  public dayToEdit: Day;
  public showSuccess = false;
  public showError = false;
  public errorText: string;
  public successText: string;
  public saveOk = false;
  public deleteActive = false;
  public days: Day[];
  public instance: any;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.days = [];
    this.dayToEdit = new Day();
    this.dayToEdit.date = new Date();
    this.getDays();
  }

  public editDay(day) {
    if (day) {
      this.dayToEdit.name = day.name;
      this.dayToEdit.date = day.date;
      this.dayToEdit._id = day._id;
    } else {
      this.dayToEdit.name = "Gib mir ein Motto";
      this.dayToEdit.date = new Date();
      this.dayToEdit._id = "";
    }
    const elem = this.datePicker.nativeElement;
    const options = {
      format: "dddd dd-mm-yyyy",
      defaultDate:  this.dayToEdit.date,
      setDefaultDate: true,
      minDate: new Date()
    }
    this.instance = new M.Datepicker(elem, options);
    this.instance.gotoDate( this.dayToEdit.date);
    setTimeout(() => {
      M.updateTextFields();
    }, 1);
    this.editActive = true;
    this.deleteActive = true;
  }

  public closeEdit(reload) {
    this.editActive = false;
    this.dayToEdit.name = "";
    this.saveOk = false;
    this.deleteActive = false;
    this.showError = false;
    this.showSuccess = false;
    this.instance.destroy();
    if (reload) {
       this.getDays();
    }
  }

  public saveDay() {
    if (this.dayToEdit) {
      this.dayToEdit.date = this.instance.date;
      this.httpService.updateDay(this.dayToEdit).subscribe(
        () => {
          this.showSuccess = true;
          this.successText = "Tag gespeichert";
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

  public deleteDay() {
    if (this.dayToEdit && this.dayToEdit._id && this.dayToEdit._id.length > 0) {
      this.httpService.deleteDay(this.dayToEdit).subscribe(
        () => {
          this.showSuccess = true;
          this.successText = "Tag gelöscht";
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

  private getDays() {
    this.httpService.getDays().subscribe(
      (days: Day[]) => {
    this.days = days;
      },
      err => {
        this.showError = true;
        this.errorText = err.error;
      }
    );
  }
}
