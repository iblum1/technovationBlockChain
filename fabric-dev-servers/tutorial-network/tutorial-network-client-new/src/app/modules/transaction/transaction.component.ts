import { RouterModule } from '@angular/router';
import { Endpoints } from '../endpoints';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ChangeDetectorRef } from '@angular/core';
declare const $;
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router,private changeDetector: ChangeDetectorRef) { }

  tradingSymbol: string = 'symbol';
  description: string = '';
  mainExchange: string = 'MBS';
  quantity: number;
  owner: string = '';
  product: string = 'FN15';
  transaction: string;
  isLoading: boolean = false;
  products = [
    'FN15','FN30','FN45'
  ]
  headers = [
    '','JUN', 'JUL','AUG'
  ];
  rows = [
    '2.500','3.000','3.500','4.000','4.500'
  ];

  transactionOptions: any;

  ngOnInit() {  }

  sell(month,coupon) {
    this.tradingSymbol = this.product + '_' + coupon + '_' + Math.floor(Math.random()*100);
    this.owner = "BOF";
    this.transaction = 'SELL';
    $('#transactionModal').modal();
  }

  buy(month,coupon) {
    this.tradingSymbol = this.product + '_' + coupon + '_' + Math.floor(Math.random()*100);
    this.owner = 'FANNIEMAE';
    this.transaction = "BUY";
    $('#transactionModal').modal();
  }

  createCommodity() {
    $('#transactionModal').modal();
    this.changeDetector.detectChanges();
    let formData = {
      "$class": "org.example.mynetwork.Commodity",
      tradingSymbol:this.tradingSymbol,
      description: this.description,
      mainExchange: this.mainExchange,
      quantity: this.quantity,
      owner: this.owner
    }
    this.isLoading = true;
    this.http.post(Endpoints.COMMODITY, formData).subscribe(
      (res) => {
        // this.isLoading = false;
        this.createTrade();
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
      });
  }

  createTrade() {
    let formData = {
      "$class": "org.example.mynetwork.Trade",
      commodity:this.tradingSymbol,
      newOwner:(this.owner=='FANNIEMAE')?'BOF':'FANNIEMAE',
      transactionId: '',
      timestamp: new Date().toISOString()
    }
    this.isLoading = true;
    this.http.post(Endpoints.TRADE, formData).subscribe(
      (res) => {
        this.isLoading = false;
        this.router.navigate(['/trades']);
      },
      (error) => {
        this.isLoading = false;
      });
  }

}
