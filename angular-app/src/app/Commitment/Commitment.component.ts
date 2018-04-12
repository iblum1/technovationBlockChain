import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommitmentService } from './Commitment.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Commitment',
	templateUrl: './Commitment.component.html',
	styleUrls: ['./Commitment.component.css'],
  providers: [CommitmentService]
})
export class CommitmentComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          commitmentId = new FormControl("", Validators.required);
        
  
      
          seller = new FormControl("", Validators.required);
        
  
      
          buyer = new FormControl("", Validators.required);
        
  
      
          currentCommitmentAmount = new FormControl("", Validators.required);
        
  
      
          commitmentAmountToReach = new FormControl("", Validators.required);
        
  
      
          commitmentEndDate = new FormControl("", Validators.required);
        
  
      
          commitmentStartDate = new FormControl("", Validators.required);
        
  
      
          loansReceived = new FormControl("", Validators.required);
        
  


  constructor(private serviceCommitment:CommitmentService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          commitmentId:this.commitmentId,
        
    
        
          seller:this.seller,
        
    
        
          buyer:this.buyer,
        
    
        
          currentCommitmentAmount:this.currentCommitmentAmount,
        
    
        
          commitmentAmountToReach:this.commitmentAmountToReach,
        
    
        
          commitmentEndDate:this.commitmentEndDate,
        
    
        
          commitmentStartDate:this.commitmentStartDate,
        
    
        
          loansReceived:this.loansReceived
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceCommitment.getAll()
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
      $class: "org.techno.demo.Commitment",
      
        
          "commitmentId":this.commitmentId.value,
        
      
        
          "seller":this.seller.value,
        
      
        
          "buyer":this.buyer.value,
        
      
        
          "currentCommitmentAmount":this.currentCommitmentAmount.value,
        
      
        
          "commitmentAmountToReach":this.commitmentAmountToReach.value,
        
      
        
          "commitmentEndDate":this.commitmentEndDate.value,
        
      
        
          "commitmentStartDate":this.commitmentStartDate.value,
        
      
        
          "loansReceived":this.loansReceived.value
        
      
    };

    this.myForm.setValue({
      
        
          "commitmentId":null,
        
      
        
          "seller":null,
        
      
        
          "buyer":null,
        
      
        
          "currentCommitmentAmount":null,
        
      
        
          "commitmentAmountToReach":null,
        
      
        
          "commitmentEndDate":null,
        
      
        
          "commitmentStartDate":null,
        
      
        
          "loansReceived":null
        
      
    });

    return this.serviceCommitment.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "commitmentId":null,
        
      
        
          "seller":null,
        
      
        
          "buyer":null,
        
      
        
          "currentCommitmentAmount":null,
        
      
        
          "commitmentAmountToReach":null,
        
      
        
          "commitmentEndDate":null,
        
      
        
          "commitmentStartDate":null,
        
      
        
          "loansReceived":null 
        
      
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
      $class: "org.techno.demo.Commitment",
      
        
          
        
    
        
          
            "seller":this.seller.value,
          
        
    
        
          
            "buyer":this.buyer.value,
          
        
    
        
          
            "currentCommitmentAmount":this.currentCommitmentAmount.value,
          
        
    
        
          
            "commitmentAmountToReach":this.commitmentAmountToReach.value,
          
        
    
        
          
            "commitmentEndDate":this.commitmentEndDate.value,
          
        
    
        
          
            "commitmentStartDate":this.commitmentStartDate.value,
          
        
    
        
          
            "loansReceived":this.loansReceived.value
          
        
    
    };

    return this.serviceCommitment.updateAsset(form.get("commitmentId").value,this.asset)
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

    return this.serviceCommitment.deleteAsset(this.currentId)
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

    return this.serviceCommitment.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "commitmentId":null,
          
        
          
            "seller":null,
          
        
          
            "buyer":null,
          
        
          
            "currentCommitmentAmount":null,
          
        
          
            "commitmentAmountToReach":null,
          
        
          
            "commitmentEndDate":null,
          
        
          
            "commitmentStartDate":null,
          
        
          
            "loansReceived":null 
          
        
      };



      
        if(result.commitmentId){
          
            formObject.commitmentId = result.commitmentId;
          
        }else{
          formObject.commitmentId = null;
        }
      
        if(result.seller){
          
            formObject.seller = result.seller;
          
        }else{
          formObject.seller = null;
        }
      
        if(result.buyer){
          
            formObject.buyer = result.buyer;
          
        }else{
          formObject.buyer = null;
        }
      
        if(result.currentCommitmentAmount){
          
            formObject.currentCommitmentAmount = result.currentCommitmentAmount;
          
        }else{
          formObject.currentCommitmentAmount = null;
        }
      
        if(result.commitmentAmountToReach){
          
            formObject.commitmentAmountToReach = result.commitmentAmountToReach;
          
        }else{
          formObject.commitmentAmountToReach = null;
        }
      
        if(result.commitmentEndDate){
          
            formObject.commitmentEndDate = result.commitmentEndDate;
          
        }else{
          formObject.commitmentEndDate = null;
        }
      
        if(result.commitmentStartDate){
          
            formObject.commitmentStartDate = result.commitmentStartDate;
          
        }else{
          formObject.commitmentStartDate = null;
        }
      
        if(result.loansReceived){
          
            formObject.loansReceived = result.loansReceived;
          
        }else{
          formObject.loansReceived = null;
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
      
        
          "commitmentId":null,
        
      
        
          "seller":null,
        
      
        
          "buyer":null,
        
      
        
          "currentCommitmentAmount":null,
        
      
        
          "commitmentAmountToReach":null,
        
      
        
          "commitmentEndDate":null,
        
      
        
          "commitmentStartDate":null,
        
      
        
          "loansReceived":null 
        
      
      });
  }

}
