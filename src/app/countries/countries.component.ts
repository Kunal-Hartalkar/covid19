import { Component, OnInit } from '@angular/core';
import { DataextractService } from '../dataextract.service';
import { DataModelCountries } from '../dataModelCountries';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  headingCountries = [
    { title: 'Total Cases', count: 0 },
    { title: 'Active Cases', count: 0},
    { title: 'Death', count: 0},
    { title: 'Recovered Cases', count: 0},
  ]

  countries = [];
  country = [];
  selectedData: any;
  selectedCountry: string = '';

  constructor(private services: DataextractService) { }

  ngOnInit() {
    this.services.getGlobalDataCountries().subscribe(
      (data: DataModelCountries[]) => {
        data.map((cv) => {this.country.push(cv.country);
                          this.countries.push(cv);});
      }
    )
  }
  onselectCountry(e){
    this.selectedCountry = e.target.value;
    this.selectedData = this.countries.filter((cv) =>{
      return cv.country === this.selectedCountry;
    })

    const tempCountries = this.selectedData[0];
    this.headingCountries[0].count = tempCountries.totalConfirmed;
    this.headingCountries[1].count = tempCountries.totalActive;
    this.headingCountries[2].count = tempCountries.totalDeaths;
    this.headingCountries[3].count = tempCountries.totalRecovered;
  }

  



}
