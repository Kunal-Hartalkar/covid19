import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { DataextractService } from '../dataextract.service';
import { DataModel } from '../datamodel';
import { GoogleChartInterface } from 'ng2-google-charts';
import { DataModelCountries } from '../dataModelCountries';
import * as c3 from 'c3';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet,  monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip  } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit  {
  countries = [];
  binding = 'totalConfirmed' ;

  // piechart variable
  public pieChartData: number[] = [];
  public pieChartLabels: string[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartColors =  [{
    backgroundColor: [],
  }];
  public pieChartOptions: ChartOptions = {
                                          responsive: true,
                                          legend: {
                                            position: 'top',
                                          }
                                        };
  public pieChartLegend = true;
  // pie chart var end

  // bar chart var
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  // bar chart var end

  headings = [
    { title: 'Total Cases', count: 0 },
    { title: 'Active Cases', count: 0 },
    { title: 'Death', count: 0 },
    { title: 'Recovered Cases', count: 0 },
  ];

  constructor(
    private service: DataextractService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.service.getGlobalData().subscribe((data: DataModel) => {
      // console.log(data);
      this.headings[0].count = data.totalConfirmed;
      this.headings[1].count = data.totalActive;
      this.headings[2].count = data.totalDeaths;
      this.headings[3].count = data.totalRecovered;
    });

    this.service
      .getGlobalDataCountries()
      .subscribe((data: DataModelCountries[]) => {
        data.map((cv) => {
          this.countries.push(cv);
          if (cv.totalConfirmed > 10000) {
            this.pieChartLabels.push(cv.country);
            this.pieChartData.push(cv.totalConfirmed);
            this.pieChartColors[0].backgroundColor.push('#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6));
          }
        });
        // console.log(this.countries);
      });

      // this.service.getGlobalDataDate().subscribe(
      //     (data) =>{ 
      //       console.log(data);
      //     }
      // );
  }
  onUpdateChart(input: HTMLInputElement) {
    this.pieChartData = [];
    this.pieChartLabels = [];
    this.pieChartColors = [{
      backgroundColor: []
    }];
    const selectedRadioButton: any = input.value;
    console.log(selectedRadioButton);
    this.countries.map((cv) => {
      if (cv[selectedRadioButton] > 5000) {
            console.log(this.pieChartData);
            this.pieChartLabels.push(cv.country);
            this.pieChartData.push(cv[selectedRadioButton]);
            this.pieChartColors[0].backgroundColor.push('#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6));
      }
    });
  }
}
