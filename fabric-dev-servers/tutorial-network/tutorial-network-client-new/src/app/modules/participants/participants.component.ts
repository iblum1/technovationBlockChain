import { Endpoints } from '../endpoints';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  traders: any = [];

  getParticipants() {
    console.log(Endpoints);
    // this.isLoading = true;
    this.http.get(Endpoints.TRADER).subscribe(
      (res) => {
        // this.isLoading = false;
        // this.router.navigate(['/trades']);
        console.log(res);
        this.traders = res;
      },
      (error) => {
        // this.isLoading = false;
        console.error(error);
      });
  }

}
