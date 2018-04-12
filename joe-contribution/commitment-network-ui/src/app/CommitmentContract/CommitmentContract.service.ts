import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { CommitmentContract } from '../com.innovation.commitment.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class CommitmentContractService {

	
		private NAMESPACE: string = 'CommitmentContract';
	



    constructor(private dataService: DataService<CommitmentContract>) {
    };

    public getAll(): Observable<CommitmentContract[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<CommitmentContract> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<CommitmentContract> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<CommitmentContract> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<CommitmentContract> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
