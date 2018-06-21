import { Endpoints } from '../endpoints';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css']
})
export class TradesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  trades: any = [];

  ngOnInit() {
    this.getTrades();
  }

  getTrades() {
    console.log(Endpoints);
    // this.isLoading = true;
    this.http.get(Endpoints.TRADE).subscribe(
      (res) => {
        // this.isLoading = false;
        // this.router.navigate(['/trades']);
        this.trades = res;
      },
      (error) => {
        // this.isLoading = false;
        console.error(error);
      });
  }

}
