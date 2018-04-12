import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { LoanComponent } from './Loan/Loan.component';
import { CommitmentComponent } from './Commitment/Commitment.component';


  import { SellerComponent } from './Seller/Seller.component';
  import { BuyerComponent } from './Buyer/Buyer.component';


  import { SendLoanComponent } from './SendLoan/SendLoan.component';
  import { CreateLoanComponent } from './CreateLoan/CreateLoan.component';
  import { SetupDemoComponent } from './SetupDemo/SetupDemo.component';  
const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Loan', component: LoanComponent},
    
		{ path: 'Commitment', component: CommitmentComponent},
    
    
      { path: 'Seller', component: SellerComponent},
      
      { path: 'Buyer', component: BuyerComponent},
      
      
        { path: 'SendLoan', component: SendLoanComponent},
        
        { path: 'CreateLoan', component: CreateLoanComponent},
        
        { path: 'SetupDemo', component: SetupDemoComponent},
        
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
