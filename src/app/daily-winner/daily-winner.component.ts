import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-daily-winner',
  templateUrl: './daily-winner.component.html'
})
export class DailyWinnerComponent implements OnInit {

  public winners;
  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.httpService.getDailyWinners().subscribe((winners) => {
      this.winners = winners;
    });
  }

}
