import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Loan } from '../org.techno.demo';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class LoanService {

	
		private NAMESPACE: string = 'Loan';
	



    constructor(private dataService: DataService<Loan>) {
    };

    public getAll(): Observable<Loan[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Loan> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Loan> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Loan> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Loan> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
