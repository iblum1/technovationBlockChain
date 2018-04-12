import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Commitment } from '../org.techno.demo';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class CommitmentService {

	
		private NAMESPACE: string = 'Commitment';
	



    constructor(private dataService: DataService<Commitment>) {
    };

    public getAll(): Observable<Commitment[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Commitment> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Commitment> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Commitment> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Commitment> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
