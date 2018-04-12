/**
*@param {org.techno.demo.SendLoan} sendLoan
*@transaction
*/
async function consumeLoan(sendLoan) {
	const commitment = sendLoan.commitment;
  	const loan = sendLoan.loan;
  
  	console.log('Commitment :: ' + commitment + ' Loan :: ' + loan);
  
  	if (loan.business === commitment.buyer) {
      console.log('Invalid, cannot send loans that are already owned by seller');
    }
    else {

      let consumeLoan = commitment.currentCommitmentAmount + loan.amount;
      loan.commitment = commitment;
      loan.status = 'ACQUIRED'; 
      loan.business = commitment.buyer;

      commitment.currentCommitmentAmount += loan.loanAmount;

      if (commitment.loansReceived) {
        commitment.loansReceived.push(loan);
      }
      else {
        commitment.loansReceived = [loan];
      }

      console.log('Received Loan: ' + loan.loanId + ' @ ' + sendLoan.timestamp);

      if (commitment.currentCommitmentAmount >= commitment.commitmentAmountToReach) {
        console.log('Commitment amount reached!');
      } else {
        console.log('Commitment Amount reached so far : ' + commitment.currentCommitmentAmount);
      }	

      const sellerReg = await getParticipantRegistry('org.techno.demo.Seller');
      await sellerReg.update(commitment.seller);

      const buyerReg = await getParticipantRegistry('org.techno.demo.Buyer');
      await buyerReg.update(commitment.buyer);  

      const commitmentReg = await getAssetRegistry('org.techno.demo.Commitment');
      await commitmentReg.update(commitment);

      const loanReg = await getAssetRegistry('org.techno.demo.Loan');
      await loanReg.update(loan);
    }
}

/**
* @param {org.techno.demo.SetupDemo} setupDemo
* @transaction
*/
async function setupDemo(setupDemo) {
 const factory = getFactory();
 const NS = 'org.techno.demo';
  
  //create the seller
  const seller = factory.newResource(NS, 'Seller', 'banker@bank.com');
  const sellerAddress = factory.newConcept(NS, 'Address');
  sellerAddress.country = 'USA';
  seller.address = sellerAddress;
  
  //create the buyer
  const buyer = factory.newResource(NS, 'Buyer', 'mortgagebuyer@buyer.com');
  const buyerAddress = factory.newConcept(NS, 'Address');
  buyerAddress.country = 'USA';
  buyer.address = buyerAddress;
  
  //Setup a sample commitment between Seller and Buyer to be reached
  const commitment = factory.newResource(NS, 'Commitment', 'CommitmentAgreement1');
  commitment.seller = factory.newRelationship(NS, 'Seller', 'banker@bank.com');
  commitment.buyer = factory.newRelationship(NS, 'Buyer', 'mortgagebuyer@buyer.com');
  const tomorrow = setupDemo.timestamp;
  tomorrow.setDate(tomorrow.getDate() + 1);
  commitment.commitmentEndDate = tomorrow;
  commitment.currentCommitmentAmount = 0;
  commitment.commitmentAmountToReach = 8000000;
  commitment.commitmentStartDate = setupDemo.timestamp;
  
  // Setup a few smaple loans to be sent from Seller to Buyer
  const loanOne = factory.newResource(NS, 'Loan', 'Loan4');
  loanOne.loanAmount = 300000;
  loanOne.status = 'ATSELLER';
  const matureDate = setupDemo.timestamp;
  matureDate.setDate(tomorrow.getDate() + 1);
  loanOne.maturityDate = matureDate
  loanOne.business = seller;
  
  const loanTwo = factory.newResource(NS, 'Loan', 'Loan5');
  loanTwo.loanAmount = 400000;
  loanTwo.status = 'ATSELLER';
  loanTwo.maturityDate = matureDate;
  loanTwo.business = seller;
  
  const loanThree = factory.newResource(NS, 'Loan', 'Loan6');
  loanThree.loanAmount = 500000;
  loanThree.status = 'ATSELLER';
  loanThree.maturityDate = matureDate;
  loanThree.business = seller;
  
  const sellerReg = await getParticipantRegistry(NS + '.Seller');
  await sellerReg.addAll([seller]);
  
  const buyerReg = await getParticipantRegistry(NS + '.Buyer');
  await buyerReg.addAll([buyer]);
  
  const loanReg = await getAssetRegistry(NS + '.Loan');
  await loanReg.addAll([loanOne, loanTwo, loanThree]);
  
  const commitmentReg = await getAssetRegistry(NS + '.Commitment');
  await commitmentReg.addAll([commitment]);
  
}