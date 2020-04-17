import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
// import { Ng2GoogleChartsModule, GoogleChartsSettings } from 'ng2-google-charts';
import {ChartsModule} from 'ng2-charts';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CountriesComponent } from './countries/countries.component';
import { CardsUpdateDataComponent } from './cards-update-data/cards-update-data.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndiaComponent } from './india/india.component';

const route: Routes = [
  {path: '', component: HomeComponent },
  {path: 'countries', component: CountriesComponent },
  {path: 'India', component: IndiaComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountriesComponent,
    CardsUpdateDataComponent,
    NavbarComponent,
    IndiaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(route),
    HttpClientModule,
    // Ng2GoogleChartsModule,
    ChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
