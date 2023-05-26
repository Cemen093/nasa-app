import {Component, OnInit} from '@angular/core';
import {AsteroidsData, AsteroidResponse} from "../../interfaces/asteroidsData";
import {NasaApiService} from "../../services/nasa-api.service";
import {Router} from "@angular/router";
import {DateService} from "../../services/date.service";

@Component({
  selector: 'app-asteroids',
  templateUrl: './asteroids.component.html',
  styleUrls: ['./asteroids.component.css']
})
export class AsteroidsComponent implements OnInit {
  protected readonly Object = Object;
  loading: boolean = true;
  start_date: string = '2023-05-01';
  end_date: string = '2023-05-07';
  asteroidData!: AsteroidsData;
  selectedDate!: string;

  constructor(
    private nasaApiService: NasaApiService,
    private router: Router,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    this.getAsteroids();
  }

  getAsteroids(): void {
    if (!this.dateService.isFirstDateLessThanSecond(this.start_date, this.end_date)){
      alert("Начальная дата должна быть раньше конечной")
      return;
    } else if (!this.dateService.isDateDifLessThan(this.start_date, this.end_date, 8)){
      alert("Разница в начальной и конечной дате не должна превышать 7 дней")
      return;
    }
    this.loading = true;
    this.nasaApiService.getAsteroids(this.start_date, this.end_date).subscribe(
      (data: AsteroidResponse) => {
        this.asteroidData = data.near_earth_objects;
        this.loading = false;
        this.selectedDate = Object.keys(data.near_earth_objects)[0];
      },
      (error) => {
        this.router.navigate(['/error'], { state: { error } });
        this.loading = false;
      }
    );
  }

  selectDateTab(date: string): void {
    this.selectedDate = date;
  }

  openAsteroidDetails(id: string): void {
    this.router.navigate(['/asteroid-details', id]);
  }
}
