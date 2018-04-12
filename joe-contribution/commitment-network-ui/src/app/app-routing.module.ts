import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { CommitmentComponent } from './Commitment/Commitment.component';
import { CommitmentContractComponent } from './CommitmentContract/CommitmentContract.component';


  import { SellerComponent } from './Seller/Seller.component';
  import { ServicerComponent } from './Servicer/Servicer.component';
  import { MediatorComponent } from './Mediator/Mediator.component';


  import { LoanDeliveredComponent } from './LoanDelivered/LoanDelivered.component';
  import { SetupDemoComponent } from './SetupDemo/SetupDemo.component';  
const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Commitment', component: CommitmentComponent},
    
		{ path: 'CommitmentContract', component: CommitmentContractComponent},
    
    
      { path: 'Seller', component: SellerComponent},
      
      { path: 'Servicer', component: ServicerComponent},
      
      { path: 'Mediator', component: MediatorComponent},
      
      
        { path: 'LoanDelivered', component: LoanDeliveredComponent},
        
        { path: 'SetupDemo', component: SetupDemoComponent},
        
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
