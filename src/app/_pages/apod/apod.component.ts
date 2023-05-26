import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApodData} from "../../interfaces/apodData";
import {NasaApiService} from "../../services/nasa-api.service";
import {DateService} from "../../services/date.service";

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css']
})
export class ApodComponent implements OnInit {
  image: ApodData | null = null;
  images: ApodData[] | null = null;
  isLoading: boolean = false;
  date: string = '';
  start_date: string = '';
  end_date: string = '';
  count: string = '10';

  constructor(
    private nasaApiService: NasaApiService,
    private router: Router,
    private dateService: DateService
  ) {
  }

  ngOnInit(): void {
  }

  getApodFromDate(): void{
    if (this.date && this.dateService.isFirstDateLessThanSecond(this.date, this.dateService.formatDateDashYearMonthDay(new Date()))) {
    this.isLoading = true;
      this.image = null;
      this.images = null;
      this.nasaApiService.getApodFromDate(this.date).subscribe(
        (data: ApodData) => {
          this.image = data;
          this.isLoading = false;
        },
        this.err
      );
    } else {
      alert("Введите дату которая еще не наступила")
    }
  }

  getApodFromRangeDate(): void{
    if (this.dateService.isFirstDateLessThanSecond(this.start_date, this.end_date)) {
      this.isLoading = true
      this.image = null;
      this.images = null;
      this.nasaApiService.getApodFromRangeDate(this.start_date, this.end_date).subscribe(
        (data: ApodData[]) => {
          this.images = data;
          this.isLoading = false;
        },
        this.err
      );
    } else {
      alert("Дата старта должна быть раньше или ровняться второй")
    }
  }

  getApodFromRangeCount(): void{
    if (parseInt(this.count) > 0) {
      this.isLoading = true
      this.image = null;
      this.images = null;
      this.nasaApiService.getApodFromCount(this.count).subscribe(
        (data: ApodData[]) => {
          this.images = data;
          this.isLoading = false;
        },
        this.err
      );
    } else {
      alert("Количество должно быть положительное")
    }
  }

  private err=(error: any) => {
  this.router.navigate(['/error'], {state: {error}});
  this.isLoading = false;
}

  openImageDetails(apod: ApodData): void {
    this.router.navigate(['/apod-details'], {state: {apod}});
  }
}
