import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoanService } from './Loan.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Loan',
	templateUrl: './Loan.component.html',
	styleUrls: ['./Loan.component.css'],
  providers: [LoanService]
})
export class LoanComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          loanId = new FormControl("", Validators.required);
        
  
      
          loanAmount = new FormControl("", Validators.required);
        
  
      
          maturityDate = new FormControl("", Validators.required);
        
  
      
          status = new FormControl("", Validators.required);
        
  
      
          commitment = new FormControl("", Validators.required);
        
  
      
          business = new FormControl("", Validators.required);
        
  


  constructor(private serviceLoan:LoanService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          loanId:this.loanId,
        
    
        
          loanAmount:this.loanAmount,
        
    
        
          maturityDate:this.maturityDate,
        
    
        
          status:this.status,
        
    
        
          commitment:this.commitment,
        
    
        
          business:this.business
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceLoan.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.techno.demo.Loan",
      
        
          "loanId":this.loanId.value,
        
      
        
          "loanAmount":this.loanAmount.value,
        
      
        
          "maturityDate":this.maturityDate.value,
        
      
        
          "status":this.status.value,
        
      
        
          "business":this.business.value
        
      
    };

    this.myForm.setValue({
      
        
          "loanId":null,
        
      
        
          "loanAmount":null,
        
      
        
          "maturityDate":null,
        
      
        
          "status":null,
        
      
        
          "commitment":null,
        
      
        
          "business":null
        
      
    });

    return this.serviceLoan.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "loanId":null,
        
      
        
          "loanAmount":null,
        
      
        
          "maturityDate":null,
        
      
        
          "status":null,
        
      
        
          "commitment":null,
        
      
        
          "business":null 
        
      
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


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.techno.demo.Loan",
      
        
          
        
    
        
          
            "loanAmount":this.loanAmount.value,
          
        
    
        
          
            "maturityDate":this.maturityDate.value,
          
        
    
        
          
            "status":this.status.value,
          
        
    
        
          
            "commitment":this.commitment.value,
          
        
    
        
          
            "business":this.business.value
          
        
    
    };

    return this.serviceLoan.updateAsset(form.get("loanId").value,this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceLoan.deleteAsset(this.currentId)
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

    return this.serviceLoan.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "loanId":null,
          
        
          
            "loanAmount":null,
          
        
          
            "maturityDate":null,
          
        
          
            "status":null,
          
        
          
            "commitment":null,
          
        
          
            "business":null 
          
        
      };



      
        if(result.loanId){
          
            formObject.loanId = result.loanId;
          
        }else{
          formObject.loanId = null;
        }
      
        if(result.loanAmount){
          
            formObject.loanAmount = result.loanAmount;
          
        }else{
          formObject.loanAmount = null;
        }
      
        if(result.maturityDate){
          
            formObject.maturityDate = result.maturityDate;
          
        }else{
          formObject.maturityDate = null;
        }
      
        if(result.status){
          
            formObject.status = result.status;
          
        }else{
          formObject.status = null;
        }
      
        if(result.commitment){
          
            formObject.commitment = result.commitment;
          
        }else{
          formObject.commitment = null;
        }
      
        if(result.business){
          
            formObject.business = result.business;
          
        }else{
          formObject.business = null;
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
      
        
          "loanId":null,
        
      
        
          "loanAmount":null,
        
      
        
          "maturityDate":null,
        
      
        
          "status":null,
        
      
        
          "commitment":null,
        
      
        
          "business":null 
        
      
      });
  }

}
