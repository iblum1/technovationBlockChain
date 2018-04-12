import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { CreateLoan } from '../org.techno.demo';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class CreateLoanService {

	
		private NAMESPACE: string = 'CreateLoan';
	



    constructor(private dataService: DataService<CreateLoan>) {
    };

    public getAll(): Observable<CreateLoan[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getTransaction(id: any): Observable<CreateLoan> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addTransaction(itemToAdd: any): Observable<CreateLoan> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateTransaction(id: any, itemToUpdate: any): Observable<CreateLoan> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteTransaction(id: any): Observable<CreateLoan> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}

