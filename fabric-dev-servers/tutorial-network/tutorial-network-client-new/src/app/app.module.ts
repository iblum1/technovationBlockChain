import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommoditiesComponent } from './modules/commodities/commodities.component';
import { TradesComponent } from './modules/trades/trades.component';
import { ParticipantsComponent } from './modules/participants/participants.component';
import { TransactionComponent } from './modules/transaction/transaction.component';
import { HomeComponent } from './modules/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    CommoditiesComponent,
    TradesComponent,
    ParticipantsComponent,
    TransactionComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
