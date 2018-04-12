import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Mediator } from '../com.innovation.commitment.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class MediatorService {

	
		private NAMESPACE: string = 'Mediator';
	



    constructor(private dataService: DataService<Mediator>) {
    };

    public getAll(): Observable<Mediator[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getparticipant(id: any): Observable<Mediator> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addParticipant(itemToAdd: any): Observable<Mediator> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateParticipant(id: any, itemToUpdate: any): Observable<Mediator> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteParticipant(id: any): Observable<Mediator> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
