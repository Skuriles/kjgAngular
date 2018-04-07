import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { HttpService } from "../services/http.service";
import { Day, DayEx } from "./day";
import { ProgramPoint } from "../program/program";
declare const M;

@Component({
  selector: "app-day",
  templateUrl: "./day.component.html"
})
export class DayComponent implements OnInit {
  @ViewChild("datepicker") datePicker: ElementRef;
  @ViewChild("pointModal") pointModal: ElementRef;
  public editActive = false;
  public dayToEdit: DayEx;
  public dayToSend: Day;
  public showSuccess = false;
  public showError = false;
  public errorText: string;
  public successText: string;
  public saveOk = false;
  public deleteActive = false;
  public delConfirmActive = false;
  public days: Day[];
  public instance: any;
  public modalInstance: any;
  public showTab = 1;
  public programPoints: ProgramPoint[];
  public programModalActive = false;
  public selectedPoint = "";
  public tabNo: number;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.days = [];
    this.dayToEdit = new DayEx();
    this.dayToEdit.factory(new Day(), []);
    this.getDays();
    const elem = this.datePicker.nativeElement;
    const options = {
      format: "dddd dd-mm-yyyy",
      defaultDate: new Date(),
      setDefaultDate: true,
      minDate: new Date()
    };
    this.instance = new M.Datepicker(elem, options);
  }

  public editDay(day: Day) {
    if (day) {
      this.dayToEdit.factory(day, this.programPoints);
      this.deleteActive = true;
    } else {
      this.dayToEdit.factory(new Day(), this.programPoints);
      this.deleteActive = false;
    }
    this.instance.gotoDate(this.dayToEdit.date);
    setTimeout(() => {
      M.updateTextFields();
    }, 1);
    this.editActive = true;
  }

  public closeEdit(reload) {
    this.editActive = false;
    this.dayToEdit.factory(new Day(), []);
    this.saveOk = false;
    this.deleteActive = false;
    this.showError = false;
    this.showSuccess = false;
    if (reload) {
      this.getDays();
    }
  }

  public saveDay() {
    if (this.dayToEdit) {
      this.dayToEdit.date = this.instance.date;
      this.dayToSend = this.dayToEdit.createDay();
      this.httpService.updateDay(this.dayToSend).subscribe(
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
  public deleteConfirmed() {
    if (this.dayToEdit && this.dayToEdit._id && this.dayToEdit._id.length > 0) {
      this.httpService.deleteDay(this.dayToEdit.createDay()).subscribe(
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
    this.delConfirmActive = false;
  }
  public deleteDenied() {
    this.delConfirmActive = false;
  }

  public deleteDay() {
    this.delConfirmActive = true;
  }

  public editProgram(tabNo: number) {
    this.tabNo = tabNo;
    const elem = this.pointModal.nativeElement;
    this.modalInstance = new M.Modal(elem, {});
    this.modalInstance.open();
  }

  public closeModal(save: boolean) {
    if (this.selectedPoint) {
      for (let i = 0; i < this.programPoints.length; i++) {
        const point = this.programPoints[i];
        switch (this.tabNo) {
          case 1:
            this.dayToEdit.morning = this.dayToEdit.getPointFromPoints(
              this.programPoints,
              this.selectedPoint
            );
            break;
          case 2:
            this.dayToEdit.afternoon = this.dayToEdit.getPointFromPoints(
              this.programPoints,
              this.selectedPoint
            );
            break;
          case 3:
            this.dayToEdit.evening = this.dayToEdit.getPointFromPoints(
              this.programPoints,
              this.selectedPoint
            );
            break;
          default:
            break;
        }
      }
    } else {
      const newPoint = new ProgramPoint();
      newPoint.shortName = "Kein Programm";
      switch (this.tabNo) {
        case 1:
          this.dayToEdit.morning = newPoint;
          break;
        case 2:
          this.dayToEdit.afternoon = newPoint;
          break;
        case 3:
          this.dayToEdit.evening = newPoint;
          break;
        default:
          break;
      }
    }
    this.modalInstance.close();
  }

  public isSelectedPoint(id: string) {
    return this.selectedPoint === id;
  }

  private getDays() {
    this.httpService.getDays().subscribe(
      (days: Day[]) => {
        this.days = days;
        this.httpService.getProgramPoints().subscribe(
          (points: ProgramPoint[]) => {
            this.programPoints = points;
          },
          err => {
            this.showError = true;
            this.errorText = err.error;
          }
        );
      },
      err => {
        this.showError = true;
        this.errorText = err.error;
      }
    );
  }
}
