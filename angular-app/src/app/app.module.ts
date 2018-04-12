import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { LoanComponent } from './Loan/Loan.component';
import { CommitmentComponent } from './Commitment/Commitment.component';


  import { SellerComponent } from './Seller/Seller.component';
  import { BuyerComponent } from './Buyer/Buyer.component';


  import { SendLoanComponent } from './SendLoan/SendLoan.component';
  import { CreateLoanComponent } from './CreateLoan/CreateLoan.component';
  import { SetupDemoComponent } from './SetupDemo/SetupDemo.component';  
@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    LoanComponent,
    
    CommitmentComponent
    ,
    
    SellerComponent,
      
      BuyerComponent
      ,

    SendLoanComponent,
        CreateLoanComponent,
        
        SetupDemoComponent
          
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    Configuration,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
