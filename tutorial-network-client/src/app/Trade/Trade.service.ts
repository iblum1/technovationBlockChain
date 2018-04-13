import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Trade } from '../org.acme.mynetwork';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class TradeService {

	
		private NAMESPACE: string = 'Trade';
	



    constructor(private dataService: DataService<Trade>) {
    };

    public getAll(): Observable<Trade[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getTransaction(id: any): Observable<Trade> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addTransaction(itemToAdd: any): Observable<Trade> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateTransaction(id: any, itemToUpdate: any): Observable<Trade> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteTransaction(id: any): Observable<Trade> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}

