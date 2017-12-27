import { Component, OnInit } from "@angular/core";
import { MyConstants } from "../constants/my-constants";

@Component({
  selector: "app-daily-plan",
  templateUrl: "./daily-plan.component.html"
})
export class DailyPlanComponent implements OnInit {

  public days = MyConstants.days;
  public times = MyConstants.times;
  constructor() { }

  ngOnInit() {
  }

}
