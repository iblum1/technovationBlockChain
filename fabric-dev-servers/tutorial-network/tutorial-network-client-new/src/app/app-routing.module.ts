import { TransactionComponent } from './modules/transaction/transaction.component';
import { ParticipantsComponent } from './modules/participants/participants.component';
import { TradesComponent } from './modules/trades/trades.component';
import { CommoditiesComponent } from './modules/commodities/commodities.component';
import { HomeComponent } from './modules/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'commodities',component:CommoditiesComponent},
  {path:'trades',component:TradesComponent},
  {path:'participants',component:ParticipantsComponent},
  {path:'transaction',component:TransactionComponent},
  {path:'**',redirectTo:"home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
