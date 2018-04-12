import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.techno.demo{
   export class Loan extends Asset {
      loanId: string;
      loanAmount: number;
      maturityDate: Date;
      status: LoanStatus;
      commitment: Commitment;
      business: Business;
   }
   export class Commitment extends Asset {
      commitmentId: string;
      seller: Seller;
      buyer: Buyer;
      currentCommitmentAmount: number;
      commitmentAmountToReach: number;
      commitmentEndDate: Date;
      commitmentStartDate: Date;
      loansReceived: Loan[];
   }
   export class Address {
      city: string;
      country: string;
      street: string;
      zip: string;
   }
   export enum LoanStatus {
      ATSELLER,
      ACQUIRED,
   }
   export abstract class Business extends Participant {
      name: string;
      address: Address;
   }
   export class Seller extends Business {
   }
   export class Buyer extends Business {
   }
   export abstract class LoanTransaction extends Transaction {
      loan: Loan;
      commitment: Commitment;
   }
   export class SendLoan extends LoanTransaction {
   }
   export class CreateLoan extends Transaction {
   }
   export class SetupDemo extends Transaction {
   }
// }
