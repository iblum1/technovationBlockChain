import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommitmentContractService } from './CommitmentContract.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-CommitmentContract',
	templateUrl: './CommitmentContract.component.html',
	styleUrls: ['./CommitmentContract.component.css'],
  providers: [CommitmentContractService]
})
export class CommitmentContractComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          contractId = new FormControl("", Validators.required);
        
  
      
          seller = new FormControl("", Validators.required);
        
  
      
          servicer = new FormControl("", Validators.required);
        
  
      
          mediator = new FormControl("", Validators.required);
        
  
      
          commitmentDateTime = new FormControl("", Validators.required);
        
  
      
          commitmentEndDateTime = new FormControl("", Validators.required);
        
  
      
          commitmentValue = new FormControl("", Validators.required);
        
  
      
          paymentValue = new FormControl("", Validators.required);
        
  
      
          feeValue = new FormControl("", Validators.required);
        
  
      
          penaltyFactor = new FormControl("", Validators.required);
        
  


  constructor(private serviceCommitmentContract:CommitmentContractService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          contractId:this.contractId,
        
    
        
          seller:this.seller,
        
    
        
          servicer:this.servicer,
        
    
        
          mediator:this.mediator,
        
    
        
          commitmentDateTime:this.commitmentDateTime,
        
    
        
          commitmentEndDateTime:this.commitmentEndDateTime,
        
    
        
          commitmentValue:this.commitmentValue,
        
    
        
          paymentValue:this.paymentValue,
        
    
        
          feeValue:this.feeValue,
        
    
        
          penaltyFactor:this.penaltyFactor
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceCommitmentContract.getAll()
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
      $class: "com.innovation.commitment.model.CommitmentContract",
      
        
          "contractId":this.contractId.value,
        
      
        
          "seller":this.seller.value,
        
      
        
          "servicer":this.servicer.value,
        
      
        
          "mediator":this.mediator.value,
        
      
        
          "commitmentDateTime":this.commitmentDateTime.value,
        
      
        
          "commitmentEndDateTime":this.commitmentEndDateTime.value,
        
      
        
          "commitmentValue":this.commitmentValue.value,
        
      
        
          "paymentValue":this.paymentValue.value,
        
      
        
          "feeValue":this.feeValue.value,
        
      
        
          "penaltyFactor":this.penaltyFactor.value
        
      
    };

    this.myForm.setValue({
      
        
          "contractId":null,
        
      
        
          "seller":null,
        
      
        
          "servicer":null,
        
      
        
          "mediator":null,
        
      
        
          "commitmentDateTime":null,
        
      
        
          "commitmentEndDateTime":null,
        
      
        
          "commitmentValue":null,
        
      
        
          "paymentValue":null,
        
      
        
          "feeValue":null,
        
      
        
          "penaltyFactor":null
        
      
    });

    return this.serviceCommitmentContract.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "contractId":null,
        
      
        
          "seller":null,
        
      
        
          "servicer":null,
        
      
        
          "mediator":null,
        
      
        
          "commitmentDateTime":null,
        
      
        
          "commitmentEndDateTime":null,
        
      
        
          "commitmentValue":null,
        
      
        
          "paymentValue":null,
        
      
        
          "feeValue":null,
        
      
        
          "penaltyFactor":null 
        
      
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
      $class: "com.innovation.commitment.model.CommitmentContract",
      
        
          
        
    
        
          
            "seller":this.seller.value,
          
        
    
        
          
            "servicer":this.servicer.value,
          
        
    
        
          
            "mediator":this.mediator.value,
          
        
    
        
          
            "commitmentDateTime":this.commitmentDateTime.value,
          
        
    
        
          
            "commitmentEndDateTime":this.commitmentEndDateTime.value,
          
        
    
        
          
            "commitmentValue":this.commitmentValue.value,
          
        
    
        
          
            "paymentValue":this.paymentValue.value,
          
        
    
        
          
            "feeValue":this.feeValue.value,
          
        
    
        
          
            "penaltyFactor":this.penaltyFactor.value
          
        
    
    };

    return this.serviceCommitmentContract.updateAsset(form.get("contractId").value,this.asset)
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

    return this.serviceCommitmentContract.deleteAsset(this.currentId)
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

    return this.serviceCommitmentContract.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "contractId":null,
          
        
          
            "seller":null,
          
        
          
            "servicer":null,
          
        
          
            "mediator":null,
          
        
          
            "commitmentDateTime":null,
          
        
          
            "commitmentEndDateTime":null,
          
        
          
            "commitmentValue":null,
          
        
          
            "paymentValue":null,
          
        
          
            "feeValue":null,
          
        
          
            "penaltyFactor":null 
          
        
      };



      
        if(result.contractId){
          
            formObject.contractId = result.contractId;
          
        }else{
          formObject.contractId = null;
        }
      
        if(result.seller){
          
            formObject.seller = result.seller;
          
        }else{
          formObject.seller = null;
        }
      
        if(result.servicer){
          
            formObject.servicer = result.servicer;
          
        }else{
          formObject.servicer = null;
        }
      
        if(result.mediator){
          
            formObject.mediator = result.mediator;
          
        }else{
          formObject.mediator = null;
        }
      
        if(result.commitmentDateTime){
          
            formObject.commitmentDateTime = result.commitmentDateTime;
          
        }else{
          formObject.commitmentDateTime = null;
        }
      
        if(result.commitmentEndDateTime){
          
            formObject.commitmentEndDateTime = result.commitmentEndDateTime;
          
        }else{
          formObject.commitmentEndDateTime = null;
        }
      
        if(result.commitmentValue){
          
            formObject.commitmentValue = result.commitmentValue;
          
        }else{
          formObject.commitmentValue = null;
        }
      
        if(result.paymentValue){
          
            formObject.paymentValue = result.paymentValue;
          
        }else{
          formObject.paymentValue = null;
        }
      
        if(result.feeValue){
          
            formObject.feeValue = result.feeValue;
          
        }else{
          formObject.feeValue = null;
        }
      
        if(result.penaltyFactor){
          
            formObject.penaltyFactor = result.penaltyFactor;
          
        }else{
          formObject.penaltyFactor = null;
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
      
        
          "contractId":null,
        
      
        
          "seller":null,
        
      
        
          "servicer":null,
        
      
        
          "mediator":null,
        
      
        
          "commitmentDateTime":null,
        
      
        
          "commitmentEndDateTime":null,
        
      
        
          "commitmentValue":null,
        
      
        
          "paymentValue":null,
        
      
        
          "feeValue":null,
        
      
        
          "penaltyFactor":null 
        
      
      });
  }

}
