import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Servicer } from '../com.innovation.commitment.model';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ServicerService {

	
		private NAMESPACE: string = 'Servicer';
	



    constructor(private dataService: DataService<Servicer>) {
    };

    public getAll(): Observable<Servicer[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getparticipant(id: any): Observable<Servicer> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addParticipant(itemToAdd: any): Observable<Servicer> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateParticipant(id: any, itemToUpdate: any): Observable<Servicer> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteParticipant(id: any): Observable<Servicer> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
