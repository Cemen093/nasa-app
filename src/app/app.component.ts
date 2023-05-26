import { Component } from '@angular/core';
import {NavigationError, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nasa-app';
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationError) {
        this.router.navigate(['/error'], { queryParams: { message: event.error.message } });
      }
    });
  }
}
