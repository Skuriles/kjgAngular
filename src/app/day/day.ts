import { ProgramPoint } from "../program/program";

export class Day {
  public name: string;
  public date: Date;
  public morning: string;
  public afternoon: string;
  public evening: string;
  public _id: string;

  constructor() {
    this.name = "Neuer Tag";
    this.date = new Date();
    this.morning = "Kein Programm"; 
    this.afternoon = "Kein Programm";
    this.evening = "Kein Programm";
    this._id = "";
  }  
}

export class DayEx {
  public name: string;
  public date: Date;
  public morning: ProgramPoint;
  public afternoon: ProgramPoint;
  public evening: ProgramPoint;
  public _id: string;

  public factory(day: Day, programPoints: ProgramPoint[]) {
    this.name = day.name;
    this._id = day._id;
    this.date = day.date;
    this.morning = this.getPointFromPoints(programPoints, day.morning);    
    this.afternoon =this.getPointFromPoints(programPoints, day.afternoon);
    this.evening = this.getPointFromPoints(programPoints, day.evening);    
  }

  public getPointFromPoints(programPoints: ProgramPoint[], id: string) {
    for (let i = 0; i < programPoints.length; i++) {
      const point = programPoints[i];
      if (point._id === id) {
        return point;
      }
    }
    const newPoint =  new ProgramPoint();   
    newPoint.shortName = "Kein Programm";
    return newPoint;
  }

  public createDay(): Day {
    const plan = new Day();
    plan.afternoon = this.afternoon._id;
    plan.evening = this.evening._id;
    plan.morning = this.morning._id;
    plan.name = this.name;
    plan.date = this.date;
    plan._id = this._id;
    return plan;
  }
}
