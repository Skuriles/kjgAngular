import { Component, OnInit } from "@angular/core";
import { FileUploader, FileItem } from "ng2-file-upload";
import { ProgramPoint } from "./program";
import { HttpService } from "../services/http.service";
import { MyConstants } from "../constants/my-constants";

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
  public delConfirmActive = false;
  public clicked = null;
  public newPerson = "";
  public newMaterial = "";
  public newMaterialActive = false;
  public newPersonActive = false;
  public newAttachment = "";
  public newLink = "";
  public newAttachmentActive = false;
  public newLinkActive = false;
  public url = "api/upload";
  public uploader: FileUploader;
  public uploadActive = false;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.initUploader();
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
      this.deleteActive = true;
    } else {
      this.deleteActive = false;
    }
    this.editActive = true;
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

  public deleteConfirmed() {
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
    this.delConfirmActive = false;
  }
  public deleteDenied() {
    this.delConfirmActive = false;
  }

  public deletePoint() {
    if (
      this.pointToEdit &&
      this.pointToEdit._id &&
      this.pointToEdit._id.length > 0
    ) {
      this.delConfirmActive = true;
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
    if (this.saveOk) {
      return;
    }
    this.pointToEdit.material.push(this.newMaterial);
  }

  public savePerson() {
    if (this.saveOk) {
      return;
    }
    this.pointToEdit.people.push(this.newPerson);
  }

  public saveLink() {
    if (this.saveOk) {
      return;
    }
    this.pointToEdit.links.push(this.newLink);
  }

  public removeLink(link: string) {
    if (this.saveOk) {
      return;
    }
    const index = this.pointToEdit.links.indexOf(link);
    if (index !== -1) {
      this.pointToEdit.links.splice(index, 1);
    }
  }
  public removeAttachment(att: string) {
    if (this.saveOk) {
      return;
    }
    const index = this.pointToEdit.attachments.indexOf(att);
    if (index !== -1) {
      this.pointToEdit.attachments.splice(index, 1);
    }
  }

  public removeMaterial(mat: string) {
    if (this.saveOk) {
      return;
    }
    const index = this.pointToEdit.material.indexOf(mat);
    if (index !== -1) {
      this.pointToEdit.material.splice(index, 1);
    }
  }

  public removePerson(person: string) {
    if (this.saveOk) {
      return;
    }
    const index = this.pointToEdit.people.indexOf(person);
    if (index !== -1) {
      this.pointToEdit.people.splice(index, 1);
    }
  }

  public startUpload() {
    if (
      this.pointToEdit &&
      this.pointToEdit._id &&
      this.pointToEdit._id.length > 0
    ) {
      this.uploader.setOptions({
        headers: [{ name: "programId", value: this.pointToEdit._id }]
      });
      this.uploader.uploadAll();
      this.uploadActive = true;
    }
  }

  public getAttachment(point: ProgramPoint, attachment: string) {
    if (point && point._id && point._id.length > 0) {
      const path = "/api/attachments/" + point._id + "/" + attachment;
      this.httpService.getAttachment(path).subscribe(data => {
        this.httpService.downloadFile(data, attachment);
      });
    }
  }

  private initUploader() {
    this.uploader = new FileUploader({
      url: this.url,
      authToken: sessionStorage.getItem(MyConstants.token)
    });
    this.uploader.onCompleteItem = (
      item: FileItem,
      res: string,
      status: number,
      headers: any
    ) => {
      this.uploadActive = false;
      this.pointToEdit.attachments.push(item._file.name);
    };
  }
}
