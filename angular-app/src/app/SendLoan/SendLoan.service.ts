import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { SendLoan } from '../org.techno.demo';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class SendLoanService {

	
		private NAMESPACE: string = 'SendLoan';
	



    constructor(private dataService: DataService<SendLoan>) {
    };

    public getAll(): Observable<SendLoan[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getTransaction(id: any): Observable<SendLoan> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addTransaction(itemToAdd: any): Observable<SendLoan> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateTransaction(id: any, itemToUpdate: any): Observable<SendLoan> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteTransaction(id: any): Observable<SendLoan> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}

