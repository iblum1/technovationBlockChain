import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { LoanDelivered } from '../com.innovation.commitment.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class LoanDeliveredService {

	
		private NAMESPACE: string = 'LoanDelivered';
	



    constructor(private dataService: DataService<LoanDelivered>) {
    };

    public getAll(): Observable<LoanDelivered[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getTransaction(id: any): Observable<LoanDelivered> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addTransaction(itemToAdd: any): Observable<LoanDelivered> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateTransaction(id: any, itemToUpdate: any): Observable<LoanDelivered> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteTransaction(id: any): Observable<LoanDelivered> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}

