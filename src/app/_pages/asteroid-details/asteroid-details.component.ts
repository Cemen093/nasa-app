import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AsteroidData} from "../../interfaces/asteroidsData";
import {NasaApiService} from "../../services/nasa-api.service";

@Component({
  selector: 'app-asteroid-details',
  templateUrl: './asteroid-details.component.html',
  styleUrls: ['./asteroid-details.component.css']
})
export class AsteroidDetailsComponent implements OnInit {
  asteroidId!: string;
  asteroidDetails!: AsteroidData;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private nasaApiService: NasaApiService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.asteroidId = params['asteroid_id'];
      this.getAsteroidDetails();
    });
  }

  getAsteroidDetails(): void {
    this.loading = true;
    this.nasaApiService.getAsteroidDetails(this.asteroidId).subscribe(
      (data: AsteroidData) => {
        this.asteroidDetails = data;
      },
      (error) => {
        this.router.navigate(['/error'], { state: { error } });
        this.loading = false;
      }
    );
  }
}
