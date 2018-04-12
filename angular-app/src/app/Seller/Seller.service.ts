import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Seller } from '../org.techno.demo';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class SellerService {

	
		private NAMESPACE: string = 'Seller';
	



    constructor(private dataService: DataService<Seller>) {
    };

    public getAll(): Observable<Seller[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getparticipant(id: any): Observable<Seller> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addParticipant(itemToAdd: any): Observable<Seller> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateParticipant(id: any, itemToUpdate: any): Observable<Seller> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteParticipant(id: any): Observable<Seller> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
