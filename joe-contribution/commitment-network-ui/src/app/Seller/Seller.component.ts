import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SellerService } from './Seller.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Seller',
	templateUrl: './Seller.component.html',
	styleUrls: ['./Seller.component.css'],
  providers: [SellerService]
})
export class SellerComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  
      
          partyId = new FormControl("", Validators.required);
        
  
      
          CompanyName = new FormControl("", Validators.required);
        
  
      
          address = new FormControl("", Validators.required);
        
  
      
          accountBalance = new FormControl("", Validators.required);
        
  


  constructor(private serviceSeller:SellerService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          partyId:this.partyId,
        
    
        
          CompanyName:this.CompanyName,
        
    
        
          address:this.address,
        
    
        
          accountBalance:this.accountBalance
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceSeller.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
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
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "com.innovation.commitment.model.Seller",
      
        
          "partyId":this.partyId.value,
        
      
        
          "CompanyName":this.CompanyName.value,
        
      
        
          "address":this.address.value,
        
      
        
          "accountBalance":this.accountBalance.value
        
      
    };

    this.myForm.setValue({
      
        
          "partyId":null,
        
      
        
          "CompanyName":null,
        
      
        
          "address":null,
        
      
        
          "accountBalance":null
        
      
    });

    return this.serviceSeller.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "partyId":null,
        
      
        
          "CompanyName":null,
        
      
        
          "address":null,
        
      
        
          "accountBalance":null 
        
      
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "com.innovation.commitment.model.Seller",
      
        
          
        
    
        
          
            "CompanyName":this.CompanyName.value,
          
        
    
        
          
            "address":this.address.value,
          
        
    
        
          
            "accountBalance":this.accountBalance.value
          
        
    
    };

    return this.serviceSeller.updateParticipant(form.get("partyId").value,this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceSeller.deleteParticipant(this.currentId)
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

    return this.serviceSeller.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "partyId":null,
          
        
          
            "CompanyName":null,
          
        
          
            "address":null,
          
        
          
            "accountBalance":null 
          
        
      };



      
        if(result.partyId){
          
            formObject.partyId = result.partyId;
          
        }else{
          formObject.partyId = null;
        }
      
        if(result.CompanyName){
          
            formObject.CompanyName = result.CompanyName;
          
        }else{
          formObject.CompanyName = null;
        }
      
        if(result.address){
          
            formObject.address = result.address;
          
        }else{
          formObject.address = null;
        }
      
        if(result.accountBalance){
          
            formObject.accountBalance = result.accountBalance;
          
        }else{
          formObject.accountBalance = null;
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
      
        
          "partyId":null,
        
      
        
          "CompanyName":null,
        
      
        
          "address":null,
        
      
        
          "accountBalance":null 
        
      
      });
  }

}
