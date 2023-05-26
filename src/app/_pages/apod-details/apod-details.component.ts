import {Component, OnInit} from '@angular/core';
import {ApodData} from "../../interfaces/apodData";
import {ActivatedRoute, Router} from "@angular/router";
import {NasaApiService} from "../../services/nasa-api.service";

@Component({
  selector: 'app-apod-details',
  templateUrl: './apod-details.component.html',
  styleUrls: ['./apod-details.component.css']
})
export class ApodDetailsComponent implements OnInit {
  apod!: ApodData;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.apod = history.state.apod;
    if (!this.apod) {
      this.router.navigate(['/apod']);
    }
  }
}
