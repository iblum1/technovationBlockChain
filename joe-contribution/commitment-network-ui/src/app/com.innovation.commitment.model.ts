import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace com.innovation.commitment.model{
   export enum ProductType {
      FIXED30,
      FIXED15,
      ARM15,
      ARM20,
      FIXED20,
   }
   export enum CommitmentStatus {
      CREATED,
      PAIROFF,
      COMMITTED,
      COMPLETE,
   }
   export enum RelationshipStatus {
      PENDING,
      ACCCEPTED,
      REJECTED,
      CANCELLED,
      SUSPENDED,
      ACTIVATED,
   }
   export abstract class CommitmentTransaction extends Transaction {
      commitment: Commitment;
   }
   export class LoanDelivered extends CommitmentTransaction {
      loanValue: number;
      loanDeliveryDate: Date;
   }
   export class Commitment extends Asset {
      commitmentId: string;
      type: ProductType;
      status: CommitmentStatus;
      loanCount: number;
      deliveredLoans: LoanDelivered[];
      contract: CommitmentContract;
   }
   export class CommitmentContract extends Asset {
      contractId: string;
      seller: Seller;
      servicer: Servicer;
      mediator: Mediator;
      commitmentDateTime: Date;
      commitmentEndDateTime: Date;
      commitmentValue: number;
      paymentValue: number;
      feeValue: number;
      penaltyFactor: number;
   }
   export class RelationshipEvent extends Event {
      message: string;
      temperature: number;
      servicer: Servicer;
      seller: Seller;
   }
   export class Address {
      city: string;
      country: string;
      street: string;
      zip: string;
   }
   export abstract class Business extends Participant {
      partyId: string;
      CompanyName: string;
      address: Address;
      accountBalance: number;
   }
   export class Seller extends Business {
   }
   export class Servicer extends Business {
   }
   export class Mediator extends Business {
   }
   export class SetupDemo extends Transaction {
   }
// }
