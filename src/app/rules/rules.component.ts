import { Component, OnInit } from "@angular/core";
import { HttpService } from "../services/http.service";
import { Rule } from "./rule";

@Component({
  selector: "app-rules",
  templateUrl: "./rules.component.html"
})
export class RulesComponent implements OnInit {
  public editActive = false;
  public ruleToEdit: Rule;
  public showSuccess = false;
  public showError = false;
  public errorText: string;
  public successText: string;
  public saveOk = false;
  public deleteActive = false;
  public delConfirmActive = false;
  public rules: Rule[];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.rules = [];
    this.getRules();
    this.ruleToEdit = new Rule();
  }

  public editRule(rule: Rule) {
    if (rule) {
      this.ruleToEdit = rule;
      this.deleteActive = true;
    } else {
      this.ruleToEdit = new Rule();
      this.deleteActive = false;
    }
    this.editActive = true;
  }

  public closeEdit(reload) {
    this.editActive = false;
    this.saveOk = false;
    this.deleteActive = false;
    this.showError = false;
    this.showSuccess = false;
    if (reload) {
      this.getRules();
    }
  }

  public saveRule() {
    if (this.ruleToEdit && this.ruleToEdit.name) {
      this.httpService.updateRule(this.ruleToEdit).subscribe(
        () => {
          this.showSuccess = true;
          this.successText = "Regel gespeichert";
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
      this.ruleToEdit &&
      this.ruleToEdit._id &&
      this.ruleToEdit._id.length > 0
    ) {
      this.httpService.deleteRule(this.ruleToEdit).subscribe(
        () => {
          this.showSuccess = true;
          this.successText = "Regel gelöscht";
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

  public deleteRule() {
    this.delConfirmActive = true;
  }

  private getRules() {
    this.httpService.getRules().subscribe(
      (rules: Rule[]) => {
        this.rules = rules;
      },
      err => {
        this.showError = true;
        this.errorText = err.error;
      }
    );
  }
}
