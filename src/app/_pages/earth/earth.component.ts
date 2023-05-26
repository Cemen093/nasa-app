import {Component} from '@angular/core';
import {EarthData} from "../../interfaces/earthData";
import {NasaApiService} from "../../services/nasa-api.service";
import {DateService} from "../../services/date.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-earth',
  templateUrl: './earth.component.html',
  styleUrls: ['./earth.component.css']
})
export class EarthComponent {
  latitude: string = '29.78';
  longitude: string = '-95.33';
  diameter: string = '0.10';
  date: string = '2018-01-01';
  isLoading: boolean = false;
  earthData: EarthData | null = null;

  constructor(
    private nasaApiService: NasaApiService,
    private dataService: DateService,
    private router: Router
  ) {
  }

  getEarthData(): void {
    this.isLoading = true;
    this.nasaApiService.getEarthData(this.latitude, this.longitude, this.diameter, this.date)
      .subscribe(
        (data: EarthData) => {
          this.earthData = data;
          this.isLoading = false;
        },
        (error) => {
          if (error.status === 404){
            alert("No imagery for specified date.")
          } else {
          this.router.navigate(['/error'], {state: {error}});
          }
          this.isLoading = false;
        }
      );
  }
}
