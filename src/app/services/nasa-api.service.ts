import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ApodData} from "../interfaces/apodData";
import {AsteroidData, AsteroidResponse} from "../interfaces/asteroidsData";
import {EarthData} from "../interfaces/earthData";
import {MarsData} from "../interfaces/marsData";
import {EpicData} from "../interfaces/epicData";
import {DateService} from "./date.service";

@Injectable({
  providedIn: 'root'
})
export class NasaApiService {
  private apiUrl = 'https://api.nasa.gov';
  private apiKey: string = '';

  constructor(
    private http: HttpClient,
    private dataService: DateService
  ) {
    this.apiKey = localStorage.getItem('apiKey') || '';
  }

  getApodFromDate(date: string): Observable<ApodData> {
    const url = `${this.apiUrl}/planetary/apod`;
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('date', date);
    return this.http.get<ApodData>(url, {params}).pipe(catchError(this.handleError));
  }
  getApodFromRangeDate(start_date: string, end_date: string): Observable<ApodData[]> {
    const url = `${this.apiUrl}/planetary/apod`;
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('start_date', start_date)
      .set('end_date', end_date)

    return this.http.get<ApodData[]>(url, {params}).pipe(catchError(this.handleError));
  }
  getApodFromCount(count: string): Observable<ApodData[]> {
    const url = `${this.apiUrl}/planetary/apod`;
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('count', 20);

    return this.http.get<ApodData[]>(url, {params}).pipe(catchError(this.handleError));
  }

  getAsteroids(startDate: string = this.dataService.formatDateDotDayMonthYear(new Date()), endDate: string): Observable<AsteroidResponse> {
    const url = `${this.apiUrl}/neo/rest/v1/feed`;
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('start_date', startDate)
    if (endDate) {
      params = params.set('end_date', endDate);
    }

    return this.http.get<AsteroidResponse>(url, {params}).pipe(catchError(this.handleError));
  }

  getAsteroidDetails(asteroid_id: string): Observable<AsteroidData> {
    const url = `${this.apiUrl}/neo/rest/v1/neo/${asteroid_id}`;
    let params = new HttpParams().set('api_key', this.apiKey);

    return this.http.get<AsteroidData>(url, {params}).pipe(catchError(this.handleError));
  }

  getEarthData(latitude: string, longitude: string, diameter: string, date: string): Observable<EarthData> {
    const url = `${this.apiUrl}/planetary/earth/assets`;

    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('lat', latitude)
      .set('lon', longitude)
      .set('dim', diameter)
      .set('date', date)

    return this.http.get<EarthData>(url, {params}).pipe(catchError(this.handleError));
  }

  getMarsData(rover: string, sol: number, camera: string, page: number): Observable<MarsData> {
    const url = `${this.apiUrl}/mars-photos/api/v1/rovers/${rover}/photos`;
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('sol', sol.toString());
    if (camera) {
      params = params.set('camera', camera)
    }
    if (page) {
      params = params.set('page', camera)
    }


    return this.http.get<MarsData>(url, {params}).pipe(catchError(this.handleError));
  }

  getEpicData(date: string, typeColor: string = 'enhanced'): Observable<EpicData[]> {
    const url = `${this.apiUrl}/EPIC/api/${typeColor}/date/${date}`;
    const params = new HttpParams().set('api_key', this.apiKey)

    return this.http.get<EpicData[]>(url, {params}).pipe(catchError(this.handleError));
  }

  getEpicImage(date: string = '2019.05.30', typeColor: string = 'enhanced', name: string): Observable<Blob> {
    const url = `${this.apiUrl}/EPIC/archive/${typeColor}/${this.dataService.formatDateSlashYearMonthDay(new Date(date))}/png/${name}.png`;
    const params = new HttpParams().set('api_key', this.apiKey);

    return this.http.get(url, { params, responseType: 'blob' }).pipe(
      map((response: Blob) => response),
      catchError(this.handleError)
    );
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'Произошла ошибка при выполнении запроса к API NASA';
    if (this.apiKey === '') {
      errorMessage = 'API key не введен. Введите ключ для начала работы';
    } else if (error.status === 403) {
      errorMessage = 'API key не действителен. Пожалуйста, введите корректный API key в настройках';
    }

    return throwError({message: errorMessage, status: error.status});
  }
}
