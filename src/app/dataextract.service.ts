import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { DataModel } from "./datamodel";
import { DataModelCountries } from "./dataModelCountries";

@Injectable({
  providedIn: "root",
})
export class DataextractService {
  globalDataUrl = "https://api.covid19api.com/summary";
  globalDataDateUrl = "https://api.covid19api.com/live/country/:country/status/:status/date/:date"


  data: any;

  constructor(private http: HttpClient) {}

  getGlobalData() {
    return this.http.get(this.globalDataUrl).pipe(
      map((data: any) => {
        const temp: DataModel =  { totalConfirmed: data.Global.TotalConfirmed,
                                totalDeaths:  data.Global.TotalDeaths,
                                totalRecovered:  data.Global.TotalRecovered,
                                totalActive: data.Global.TotalConfirmed - data.Global.TotalRecovered -  data.Global.TotalDeaths
                              };
        return temp;
      })
    );
  }

  getIndiaCaseTimeData() {
    return this.http.get('https://api.covid19india.org/data.json').pipe(
      map( (result: any) =>   result.cases_time_series  )
    );
  }

  getIndiaStateWiseData() {
    return this.http.get('https://api.covid19india.org/data.json').pipe(
      map( (data: any) => data.statewise )
    );
  }

  getIndiaDistrictWiseData(){
    return this.http.get('https://api.covid19india.org/state_district_wise.json');
  }

  getGlobalDataCountries() {
    return this.http.get(this.globalDataUrl).pipe(
      map((data: any) => {
        const tempCountries = [];
        (data.Countries).map( (data: any) => {
          const tempObj: DataModelCountries = { 
            country: data.Country,
            totalConfirmed: data.TotalConfirmed,
            totalDeaths: data.TotalDeaths,
            totalRecovered: data.TotalRecovered,
            totalActive: data.TotalConfirmed - data.TotalDeaths - data.TotalRecovered
          };
          //tempCountries.push(JSON.parse(JSON.stringify(tempObj)));
          tempCountries.push(tempObj);
        });
        return tempCountries;
      })
    );
  }
}
