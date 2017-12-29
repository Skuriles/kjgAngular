import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MyConstants } from "../constants/my-constants";
import { HttpService } from "../services/http.service";
import { Day, DayEx } from "../day/day";
import { ProgramPoint } from "../program/program";

declare const M;

@Component({
  selector: "app-daily-plan",
  templateUrl: "./daily-plan.component.html"
})
export class DailyPlanComponent implements OnInit {
  @ViewChild("dayModal") dayModal: ElementRef;
  public programPoints: ProgramPoint[];
  public days: Day[];
  public daysEx: DayEx[];
  public showSuccess = false;
  public showError = false;
  public errorText: string;
  public successText: string;
  public modalInstance: any;
  public selectedPoint: ProgramPoint;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.days = [];
    this.programPoints = [];
    this.daysEx = [];
    this.selectedPoint = new ProgramPoint();
    this.getDays();
  }

  public showModal(point: ProgramPoint) {
    if (point) {
      this.selectedPoint = point;
      const elem = this.dayModal.nativeElement;
      this.modalInstance = new M.Modal(elem, {});
      this.modalInstance.open();
    }
  }

  public closeModal() {    
    this.modalInstance.close();
    this.modalInstance.destroy();
  }

  private getDays() {
    this.httpService.getDays().subscribe(
      (days: Day[]) => {
        this.days = days;
        this.httpService.getProgramPoints().subscribe(
          (points: ProgramPoint[]) => {
            this.programPoints = points;
            this.createTable();
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

  private createTable(): void {
    for (let i = 0; i < this.days.length; i++) {
      const day = this.days[i];
      const dayEx = new DayEx();
      dayEx.factory(day, this.programPoints);
      this.daysEx.push(dayEx);
    }
  }
}
