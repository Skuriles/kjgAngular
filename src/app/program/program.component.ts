import { Component, OnInit } from "@angular/core";
import { ProgramPoint } from "./program";
import { HttpService } from "../services/http.service";

declare const M;
@Component({
  selector: "app-program",
  templateUrl: "./program.component.html"
})
export class ProgramComponent implements OnInit {
  public programPoints: ProgramPoint[];
  public pointToEdit: ProgramPoint;
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
    this.programPoints = [];
    this.pointToEdit = new ProgramPoint();
    this.getProgramPoints();
  }

  public getProgramPoints(): any {
    this.httpService.getProgramPoints().subscribe(
      (points: ProgramPoint[]) => {
        this.programPoints = points;
      },
      err => {
        this.showError = true;
        this.errorText = err.error;
      }
    );
  }

  public editPoint(point: ProgramPoint) {
    if (point) {
      this.pointToEdit.copy(point);
    }
    this.editActive = true;
    this.deleteActive = true;
    setTimeout(() => {
      M.updateTextFields();
    }, 1);
  }

  public closeEdit(reload) {
    this.editActive = false;
    this.pointToEdit = new ProgramPoint();
    this.saveOk = false;
    this.deleteActive = false;
    this.showError = false;
    this.showSuccess = false;
    this.clicked = null;
    if (reload) {
      this.getProgramPoints();
    }
  }

  public savePoint() {
    if (this.pointToEdit) {
      this.httpService.updateProgramPoint(this.pointToEdit).subscribe(
        () => {
          this.showSuccess = true;
          this.successText = "Programmpunkt gespeichert";
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

  public deletePoint() {
    if (
      this.pointToEdit &&
      this.pointToEdit._id &&
      this.pointToEdit._id.length > 0
    ) {
      this.httpService.deleteProgramPoint(this.pointToEdit).subscribe(
        () => {
          this.showSuccess = true;
          this.successText = "Programmpunkt gelöscht";
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

  public saveMaterial() {
    this.pointToEdit.material.push(this.newMaterial);
  }

  public savePerson() {
    this.pointToEdit.people.push(this.newPerson);
  }

  public removeMaterial(mat: string) {
    const index = this.pointToEdit.material.indexOf(mat);
    if (index !== -1) {
      this.pointToEdit.material.splice(index, 1);
    }
  }

  public removePerson(person: string) {
    const index = this.pointToEdit.people.indexOf(person);
    if (index !== -1) {
      this.pointToEdit.people.splice(index, 1);
    }
  }
}
