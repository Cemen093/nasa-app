import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SettingsComponent } from './_pages/settings/settings.component';
import { ErrorComponent } from './_pages/error/error.component';
import { ApodComponent } from './_pages/apod/apod.component';
import { AsteroidsComponent } from './_pages/asteroids/asteroids.component';
import { EarthComponent } from './_pages/earth/earth.component';
import { MarsComponent } from './_pages/mars/mars.component';
import { EpicComponent } from './_pages/epic/epic.component';
import {FormsModule} from "@angular/forms";
import { ApodDetailsComponent } from './_pages/apod-details/apod-details.component';
import { AsteroidDetailsComponent } from './_pages/asteroid-details/asteroid-details.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { InputBoxComponent } from './components/input-box/input-box.component';
import { SelectBoxComponent } from './components/select-box/select-box.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SettingsComponent,
    ErrorComponent,
    ApodComponent,
    AsteroidsComponent,
    EarthComponent,
    MarsComponent,
    EpicComponent,
    ApodDetailsComponent,
    AsteroidDetailsComponent,
    SpinnerComponent,
    InputBoxComponent,
    SelectBoxComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
