import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {EpicData} from "../../interfaces/epicData";
import {NasaApiService} from "../../services/nasa-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.css']
})
export class EpicComponent implements OnInit {
  date: string = '2018-01-01';
  typesColor: { label: string, value: string }[] = [
    {label: 'Улучшенный', value: 'enhanced'},
    {label: 'Натуральный', value: 'natural'}
  ];
  typeColor: string = 'enhanced';
  epicData: EpicData[] = [];
  isLoading: boolean = false;

  constructor(
    private nasaApiService: NasaApiService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  getEpicData(date: string, typeColor: string): void {
    this.isLoading = true;
    this.nasaApiService.getEpicData(date, typeColor).subscribe(
      (data: EpicData[]) => {
        console.log(data)
        this.epicData = data;
        this.isLoading = false;
      },
      (error: any) => {
        this.router.navigate(['/error'], {state: {error}});
        this.isLoading = false;
      }
    );
  }

  downloadImage(data: EpicData): void {
    console.log("data")
    console.log(data)
    this.nasaApiService.getEpicImage(data.date, this.typeColor, data.image).subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = data.image + '.png';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      (error: any) => {
        this.router.navigate(['/error'], {state: {error}});
        this.isLoading = false;
      }
    );
  }
}
