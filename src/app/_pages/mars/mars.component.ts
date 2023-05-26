import {Component} from '@angular/core';
import {MarsData} from "../../interfaces/marsData";
import {NasaApiService} from "../../services/nasa-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mars',
  templateUrl: './mars.component.html',
  styleUrls: ['./mars.component.css']
})
export class MarsComponent {
  rovers: { label: string, value: string }[] = [
    {label: 'Любопытство', value: 'curiosity'},
    {label: 'Возможность', value: 'opportunity'},
    {label: 'Дух', value: 'spirit'}
  ];
  rover: string = 'curiosity';
  cameras: { rover: string, camera: { label: string, value: string }[] }[] = [
    {
      rover: 'curiosity', camera: [
        {label: 'FHAZ', value: 'FHAZ'}, {label: 'RHAZ', value: 'RHAZ'}, {label: 'MAST', value: 'MAST'},
        {label: 'CHEMCAM', value: 'CHEMCAM'}, {label: 'MAHLI', value: 'MAHLI'}, {label: 'MARDI', value: 'MARDI'},
        {label: 'NAVCAM', value: 'NAVCAM'}
      ]
    },
    {
      rover: 'opportunity', camera: [
        {label: 'FHAZ', value: 'FHAZ'}, {label: 'RHAZ', value: 'RHAZ'}, {label: 'NAVCAM', value: 'NAVCAM'},
        {label: 'PANCAM', value: 'PANCAM'}, {label: 'MINITES', value: 'MINITES'}]
    },
    {
      rover: 'spirit', camera: [
        {label: 'FHAZ', value: 'FHAZ'}, {label: 'RHAZ', value: 'RHAZ'}, {label: 'NAVCAM', value: 'NAVCAM'},
        {label: 'PANCAM', value: 'PANCAM'}, {label: 'MINITES', value: 'MINITES'}]
    }
  ];
  camera: string = 'FHAZ';
  sol: string = '1000';
  page: string = '1';
  loading: boolean = false;
  marsData: MarsData | null = null;

  constructor(
    private nasaApiService: NasaApiService,
    private router: Router
  ) {
  }

  getCameraOptions(): { label: string, value: string }[] {
    const selectedRover = this.cameras
      .find(item => item.rover === this.rover);
    return selectedRover ? selectedRover.camera : [];
  }


  getMarsData(): void {
    console.log(this.sol)
    this.loading = true;
    this.nasaApiService.getMarsData(this.rover, parseInt(this.sol), this.camera, parseInt(this.page))
      .subscribe(
        (data: MarsData) => {
          this.marsData = data;
          this.loading = false;
        },
        (error) => {
          console.log(error)
          this.router.navigate(['/error'], {state: {error}});
          this.loading = false;
        }
      );
  }
}
