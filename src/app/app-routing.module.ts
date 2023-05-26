import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ApodComponent} from "./_pages/apod/apod.component";
import {AsteroidsComponent} from "./_pages/asteroids/asteroids.component";
import {EarthComponent} from "./_pages/earth/earth.component";
import {MarsComponent} from "./_pages/mars/mars.component";
import {EpicComponent} from "./_pages/epic/epic.component";
import {SettingsComponent} from "./_pages/settings/settings.component";
import {ErrorComponent} from "./_pages/error/error.component";
import {ApodDetailsComponent} from "./_pages/apod-details/apod-details.component";
import {AsteroidDetailsComponent} from "./_pages/asteroid-details/asteroid-details.component";

const routes: Routes = [
  { path: '', redirectTo: '/apod', pathMatch: 'full' },
  { path: 'apod', component: ApodComponent },
  { path: 'apod-details', component: ApodDetailsComponent },
  { path: 'asteroids', component: AsteroidsComponent },
  { path: 'asteroid-details/:asteroid_id', component: AsteroidDetailsComponent },
  { path: 'earth', component: EarthComponent },
  { path: 'mars', component: MarsComponent },
  { path: 'epic', component: EpicComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/apod' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
