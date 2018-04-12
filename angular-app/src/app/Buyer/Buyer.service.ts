import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Buyer } from '../org.techno.demo';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class BuyerService {

	
		private NAMESPACE: string = 'Buyer';
	



    constructor(private dataService: DataService<Buyer>) {
    };

    public getAll(): Observable<Buyer[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getparticipant(id: any): Observable<Buyer> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addParticipant(itemToAdd: any): Observable<Buyer> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateParticipant(id: any, itemToUpdate: any): Observable<Buyer> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteParticipant(id: any): Observable<Buyer> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
