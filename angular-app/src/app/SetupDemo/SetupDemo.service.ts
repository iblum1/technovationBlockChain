import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { SetupDemo } from '../org.techno.demo';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class SetupDemoService {

	
		private NAMESPACE: string = 'SetupDemo';
	



    constructor(private dataService: DataService<SetupDemo>) {
    };

    public getAll(): Observable<SetupDemo[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getTransaction(id: any): Observable<SetupDemo> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addTransaction(itemToAdd: any): Observable<SetupDemo> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateTransaction(id: any, itemToUpdate: any): Observable<SetupDemo> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteTransaction(id: any): Observable<SetupDemo> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}

