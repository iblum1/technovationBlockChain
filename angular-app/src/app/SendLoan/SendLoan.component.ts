import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SendLoanService } from './SendLoan.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-SendLoan',
	templateUrl: './SendLoan.component.html',
	styleUrls: ['./SendLoan.component.css'],
  providers: [SendLoanService]
})
export class SendLoanComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
	private errorMessage;

  
      
          loan = new FormControl("", Validators.required);
        
  
      
          commitment = new FormControl("", Validators.required);
        
  
      
          transactionId = new FormControl("", Validators.required);
        
  
      
          timestamp = new FormControl("", Validators.required);
        
  


  constructor(private serviceSendLoan:SendLoanService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          loan:this.loan,
        
    
        
          commitment:this.commitment,
        
    
        
          transactionId:this.transactionId,
        
    
        
          timestamp:this.timestamp
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceSendLoan.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the transaction field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "org.techno.demo.SendLoan",
      
        
          "loan":this.loan.value,
        
      
        
          "commitment":this.commitment.value,
        
      
        
          "transactionId":this.transactionId.value,
        
      
        
          "timestamp":this.timestamp.value
        
      
    };

    this.myForm.setValue({
      
        
          "loan":null,
        
      
        
          "commitment":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null
        
      
    });

    return this.serviceSendLoan.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "loan":null,
        
      
        
          "commitment":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "org.techno.demo.SendLoan",
      
        
          
            "loan":this.loan.value,
          
        
    
        
          
            "commitment":this.commitment.value,
          
        
    
        
          
        
    
        
          
            "timestamp":this.timestamp.value
          
        
    
    };

    return this.serviceSendLoan.updateTransaction(form.get("transactionId").value,this.Transaction)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteTransaction(): Promise<any> {

    return this.serviceSendLoan.deleteTransaction(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceSendLoan.getTransaction(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "loan":null,
          
        
          
            "commitment":null,
          
        
          
            "transactionId":null,
          
        
          
            "timestamp":null 
          
        
      };



      
        if(result.loan){
          
            formObject.loan = result.loan;
          
        }else{
          formObject.loan = null;
        }
      
        if(result.commitment){
          
            formObject.commitment = result.commitment;
          
        }else{
          formObject.commitment = null;
        }
      
        if(result.transactionId){
          
            formObject.transactionId = result.transactionId;
          
        }else{
          formObject.transactionId = null;
        }
      
        if(result.timestamp){
          
            formObject.timestamp = result.timestamp;
          
        }else{
          formObject.timestamp = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "loan":null,
        
      
        
          "commitment":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null 
        
      
      });
  }

}

