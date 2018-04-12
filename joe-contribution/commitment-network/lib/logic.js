/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {com.innovation.commitment.model.LoanDelivered} loanDelivered
 * @transaction
 */
function payOut(loanDelivered) {

    var contract = loanDelivered.commitment.contract;
    var commitment = loanDelivered.commitment;

    console.log('Received at: ' + loanDelivered.timestamp);
    console.log('Contract commitmentDateTime: ' + contract.commitmentDateTime);

    // set the status of the shipment
    commitment.status = 'CREATED';
   
	if(commitment.deliveredLoans){
       console.log('Delivered Loan Value'+loanDelivered.loanValue);
      commitment.deliveredLoans.push(loanDelivered);
     }else{
       console.log('First Loan Value'+loanDelivered.loanValue);
       commitment.deliveredLoans = [loanDelivered];
     }
    // if the shipment did not arrive on time the payout is zero
    if (loanDelivered.timestamp > contract.commitmentEndDateTime) {
        contract.seller.accountBalance -= contract.penaltyFactor;
        console.log('Late commitment. Amount dedcted from seller: -'+contract.penaltyFactor);
      commitment.status = 'PAIDOFF';
    } else {
        // find the lowest temperature reading
      
      console.log(commitment.deliveredLoans);
        if (commitment.deliveredLoans) {
            
            var total = 0;
            for(var i=0;i< commitment.deliveredLoans.length;i++){
              var loan = commitment.deliveredLoans[i];
              console.log(' the loanValue: '+commitment.deliveredLoans[i]);
                if(loan.loanValue > 0){
                    total += loan.loanValue;
                }
            }
          console.log('the total value is: '+ total);
            // does the lowest temperature violate the contract?
            if (total > contract.commitmentValue && 
                    loanDelivered.timestamp < contract.commitmentEndDateTime) {
                contract.seller.accountBalance += contract.paymentValue;
                contract.servicer.accountBalance -= contract.paymentValue;
                contract.mediator.accountBalance += contract.feeValue;
                penalty += (contract.minTemperature - lowestReading.centigrade) * contract.minPenaltyFactor;
                console.log('Min temp penalty: ' + penalty);
            }

        }
    }

    
    console.log('seller: ' + contract.seller.$identifier + ' new balance: ' + contract.seller.accountBalance);
    console.log('Servicer: ' + contract.servicer.$identifier + ' new balance: ' + contract.servicer.accountBalance);

    return getParticipantRegistry('com.innovation.commitment.model.Seller')
        .then(function (sellerRegistry) {
      console.log(sellerRegistry);
            // update the grower's balance
            return sellerRegistry.update(contract.seller);
        })
        .then(function () {
            return getParticipantRegistry('com.innovation.commitment.model.Servicer');
        })
        .then(function (servicerRegistry) {
            // update the importer's balance
            return servicerRegistry.update(contract.servicer);
        })
        .then(function () {
            return getAssetRegistry('com.innovation.commitment.model.Commitment');
        })
        .then(function (commitmentRegistry) {
            // update the state of the shipment
            return commitmentRegistry.update(commitment);
        });
}

/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {com.innovation.commitment.model.SetupDemo} setupDemo - the SetupDemo transaction
 * @transaction
 */
function setupDemo(setupDemo) {

    var factory = getFactory();
    var NS = 'com.innovation.commitment.model';

    // create the grower
    var seller = factory.newResource(NS, 'Seller', '972446223');
    var sellerAddress = factory.newConcept(NS, 'Address');
    sellerAddress.country = 'USA';
    seller.CompanyName = 'CMC Funding';
    seller.address = sellerAddress;
    seller.accountBalance = 1000;

    // create the importer
    var servicer = factory.newResource(NS, 'Servicer', '356786-432');
    var servicerAddress = factory.newConcept(NS, 'Address');
    servicerAddress.country = 'UK';
    servicer.CompanyName = 'JP Morgan Chase';
    servicer.address = servicerAddress;
    servicer.accountBalance = 12000;

    // create the shipper
    var mediator = factory.newResource(NS, 'Mediator', '658342-431');
    var mediatorAddress = factory.newConcept(NS, 'Address');
    mediatorAddress.country = 'Panama';
    mediator.CompanyName = 'Fannie Mae';
    mediator.address = mediatorAddress;
    mediator.accountBalance = 1000;

    // create the contract
    var contract = factory.newResource(NS, 'CommitmentContract', 'CON_001');
    contract.seller = factory.newRelationship(NS, 'Seller', '972446223');
    contract.servicer = factory.newRelationship(NS, 'Servicer', '356786-432');
    contract.mediator = factory.newRelationship(NS, 'Mediator', '658342-431');
    var today = setupDemo.timestamp;
    today.setDate(today.getDate());
    contract.commitmentDateTime = today; 
  // the shipment has to arrive tomorrow
  var tenDaysLater = setupDemo.timestamp;
  tenDaysLater.setDate(tenDaysLater.getDate() + 10);
    contract.commitmentEndDateTime = tenDaysLater;
    contract.commitmentValue = 5463332.04; // pay 50 cents per unit
    contract.penaltyFactor = 4322.12;
  contract.feeValue = 1200.22;
  contract.paymentValue = 2333.12;
    // create the shipment
    var commitment = factory.newResource(NS, 'Commitment', 'COMMIT_001');
    commitment.type = 'FIXED30';
    commitment.status = 'CREATED';
    commitment.loanCount = 50;
    commitment.contract = factory.newRelationship(NS, 'CommitmentContract', 'CON_001');
    return getParticipantRegistry(NS + '.Seller')
        .then(function (sellerRegistry) {
            // add the growers
            return sellerRegistry.addAll([seller]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Servicer');
        })
        .then(function(servicerRegistry) {
            // add the importers
            return servicerRegistry.addAll([servicer]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Mediator');
        })
        .then(function(mediatorRegistry) {
            // add the shippers
            return mediatorRegistry.addAll([mediator]);
        })
        .then(function() {
            return getAssetRegistry(NS + '.CommitmentContract');
        })
        .then(function(contractRegistry) {
            // add the contracts
            return contractRegistry.addAll([contract]);
        })
        .then(function() {
            return getAssetRegistry(NS + '.Commitment');
        })
        .then(function(commitmentRegistry) {
            // add the shipments
            return commitmentRegistry.addAll([commitment]);
        });
}
