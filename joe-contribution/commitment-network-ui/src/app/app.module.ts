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

import { CommitmentComponent } from './Commitment/Commitment.component';
import { CommitmentContractComponent } from './CommitmentContract/CommitmentContract.component';


  import { SellerComponent } from './Seller/Seller.component';
  import { ServicerComponent } from './Servicer/Servicer.component';
  import { MediatorComponent } from './Mediator/Mediator.component';


  import { LoanDeliveredComponent } from './LoanDelivered/LoanDelivered.component';
  import { SetupDemoComponent } from './SetupDemo/SetupDemo.component';  
@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    CommitmentComponent,
    
    CommitmentContractComponent
    ,
    
    SellerComponent,
      ServicerComponent,
      
      MediatorComponent
      ,

    LoanDeliveredComponent,
        
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
