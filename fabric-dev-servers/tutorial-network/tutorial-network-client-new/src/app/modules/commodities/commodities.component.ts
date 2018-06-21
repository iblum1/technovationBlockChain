import { Endpoints } from '../endpoints';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-commodities',
  templateUrl: './commodities.component.html',
  styleUrls: ['./commodities.component.css']
})
export class CommoditiesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  commodities: any = [];
  
    getParticipants() {
      console.log(Endpoints);
      // this.isLoading = true;
      this.http.get(Endpoints.TRADER).subscribe(
        (res) => {
          // this.isLoading = false;
          // this.router.navigate(['/trades']);
          console.log(res);
          this.commodities = res;
        },
        (error) => {
          // this.isLoading = false;
          console.error(error);
        });
    }

}
