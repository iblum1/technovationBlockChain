import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { CommodityComponent } from './Commodity/Commodity.component';


  import { TraderComponent } from './Trader/Trader.component';


  import { TradeComponent } from './Trade/Trade.component';  
const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Commodity', component: CommodityComponent},
    
    
      { path: 'Trader', component: TraderComponent},
      
      
        { path: 'Trade', component: TradeComponent},
        
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
