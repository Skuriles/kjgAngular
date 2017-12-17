import { Component, OnInit } from "@angular/core";
import { HttpService } from "../services/http.service";
import { DailyWinners, DailyWinner } from "../drinks/user-drinks";

@Component({
  selector: "app-daily-winner",
  templateUrl: "./daily-winner.component.html"
})
export class DailyWinnerComponent implements OnInit {
  public winners: DailyWinners;
  public winnerUserTotal: DailyWinner;
  public dailyWinner: DailyWinner;
  public dailyWinnersBlitz: DailyWinner;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.winnerUserTotal = new DailyWinner();
    this.dailyWinner = new DailyWinner();
    this.dailyWinnersBlitz = new DailyWinner();
    this.httpService.getDailyLeaders().subscribe((winners: DailyWinners) => {
      if (winners.winnerUserTotal.user) {
        this.winnerUserTotal = winners.winnerUserTotal;
      }
      if (winners.dailyWinner.user) {
        this.dailyWinner = winners.dailyWinner;
      }
      if (winners.dailyWinnersBlitz.user) {
        this.dailyWinnersBlitz = winners.dailyWinnersBlitz;
      }
    });
  }

  public duel() {
    if (
      this.dailyWinnersBlitz &&
      this.dailyWinnersBlitz.user &&
      this.dailyWinnersBlitz.user._id &&
      this.dailyWinnersBlitz.user._id.length > 0
    ) {
      this.httpService.duel(this.dailyWinnersBlitz.user).subscribe(
        () => {
          console.log('Duell verschickt');
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
