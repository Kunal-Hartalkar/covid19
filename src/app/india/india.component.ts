import { Component, OnInit } from '@angular/core';
import { DataextractService } from '../dataextract.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.css']
})
export class IndiaComponent implements OnInit {

  public headings = [
    { title: 'Total Confirmed', count: +'' },
    { title: 'Total Recovered', count: +'' },
    { title: 'Total Deaths', count: +'' },
    { title: 'Total Active', count: +'' }
  ];

  private IndiaData = [];
  private StateData = [];
  public  States = [];
  public District = [];
  public DistrictInput = [];
  public disrtictInputConfirmed = [];
  public selectedDistrictData = [];
  public binding = 'totalconfirmed';
  public selectedState: string;
  // *********************** Chart Data*************

  public lineChartData: ChartDataSets[] = [
    {    data: [], label: 'Datewise Count'  }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartType = 'line';
  public lineChartOptions: ChartOptions = {
      responsive: true,
      };
  // public lineChartColors =  [{
  //   backgroundColor: [],
  // }];

  

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Series A' }
  ];
  public barChartLabels: Label[] = [];
  public barChartType = 'bar';
  public barChartOptions: ChartOptions = { responsive: true };
  public barChartColors =  [{
    backgroundColor: ['#ff073a', '#007bff', '#28a745', '#6c757d'],
  }];


  constructor(
    private dataSer: DataextractService
  ) { }

  ngOnInit() {
    this.dataSer.getIndiaCaseTimeData().subscribe( (dt: Array<any>) => {
      this.IndiaData = dt.slice();
      this.headings[0].count = this.IndiaData[ this.IndiaData.length - 1 ].totalconfirmed;
      this.headings[1].count = this.IndiaData[ this.IndiaData.length - 1 ].totalrecovered;
      this.headings[2].count = this.IndiaData[ this.IndiaData.length - 1 ].totaldeceased;
      // tslint:disable-next-line: max-line-length
      this.headings[3].count = this.IndiaData[ this.IndiaData.length - 1 ].totalconfirmed - this.IndiaData[ this.IndiaData.length - 1 ].totalrecovered - this.IndiaData[ this.IndiaData.length - 1 ].totaldeceased;
      this.IndiaData.map( arrDt => this.genrateChartData(arrDt, this.binding) );
    } );

    this.dataSer.getIndiaStateWiseData().subscribe( (data) => {
      // console.log(data.slice(1));
      this.StateData = data.slice();
      data.map((cv) => {
        this.States.push(cv.state);
      });
      this.States = this.States.slice(1);
      // console.log(this.States);
    });

    this.dataSer.getIndiaDistrictWiseData().subscribe( (data) => {
      // const selectedState = this.selectedState;
        // console.log(data);
        this.District = Object.entries(data);
      
      // for(let cv in data){
      //   console.log(cv);
      // }
    })
  }

  onUpdateChart(c) {
    this.lineChartLabels = [];
    this.lineChartData[0].data = [];
    this.IndiaData.map( indDt => this.genrateChartData( indDt, c.value ) );
  }

  genrateChartData( chartData, type ) {
    this.lineChartLabels.push(chartData.date);
    // tslint:disable-next-line: max-line-length
    type !== 'totalactive' ? this.lineChartData[0].data.push(chartData[type]) : this.lineChartData[0].data.push(chartData.totalconfirmed - chartData.totalrecovered - chartData.totaldeceased);
    // if (type === 'totaldeceased') {
    //   this.lineChartData[0].data.push(chartData[type]);
    //   this.lineChartColors[0].backgroundColor.push('#6c757d');
    // }  else if (type === 'totalconfirmed') {
    //   this.lineChartData[0].data.push(chartData[type]);
    //   this.lineChartColors[0].backgroundColor.push('#ff073a');
    //   console.log(this.lineChartColors[0].backgroundColor);
    // } else if (type === 'totalrecovered') {
    //   this.lineChartData[0].data.push(chartData[type]);
    //   this.lineChartColors[0].backgroundColor.push('#28a745');
    // } else {
    //   this.lineChartData[0].data.push(chartData.totalconfirmed - chartData.totalrecovered - chartData.totaldeceased);
    //   this.lineChartColors[0].backgroundColor.push('#007bff');
    // }
  }

  onselectedState(e) {
    this.selectedState = e.target.value;
    console.log(this.selectedState);
    this.barChartData[0].data = [];
    this.barChartLabels = [];
    // console.log(this.StateData);
    this.StateData.map( (cv) => {
      if (cv.state === this.selectedState) {
        const active = cv.confirmed - cv.deltadeaths - cv.recovered;
        this.barChartLabels = ['Total Confirmed', 'Total Active', 'Total Recovered', 'Total Deaths' ];
        this.barChartData[0].data = [cv.confirmed, active, cv.recovered, cv.deltadeaths ]
        // tslint:disable-next-line: no-unused-expression
        // this.barChartColors[0].backgroundColor[ ];
        // console.log(cv.confirmed);
        // console.log(cv.deltadeaths);
        // console.log(cv.recovered);
        // console.log(cv.confirmed - cv.deltadeaths - cv.recovered );

      }
    });
    // const aa = this.District.filter( dt => this.selectedState === dt[0])[0];
    //    console.log(aa[1].districtData);
    // this.selectedDistrictData = Object.entries(this.District.filter( dt => this.selectedState === dt[0])[0]);
    this.selectedDistrictData = this.District.filter( dt => this.selectedState === dt[0])[0];
    // const district = Object.entries(this.selectedDistrictData[1].districtData);
    // district.map( (cv) => {
    //   console.log(cv[0]);
    // });
    this.DistrictInput = [];
    Object.entries(this.selectedDistrictData[1].districtData).map( (cv) => {
      this.DistrictInput.push(cv[0]);
    });
    // this.DistrictInput = this.DistrictInput.pop();
    // console.log(Object.entries(this.selectedDistrictData[1].districtData));
    this.selectedDistrictData = Object.entries(this.selectedDistrictData[1].districtData);
    this.disrtictInputConfirmed = [];
    this.selectedDistrictData.map( (cv) => {
      this.disrtictInputConfirmed.push(cv[1].confirmed);
    });
    console.log(this.selectedDistrictData);
    console.log(this.disrtictInputConfirmed);

    // this.disrtictInputConfirmed = this.disrtictInputConfirmed.pop();
  }

  // onselectedDistrict(e) {
  //   const selectedDistrictFromInput = e.target.value;
  //   console.log(selectedDistrictFromInput);
  //   this.selectedDistrictData = Object.entries(this.selectedDistrictData[1].districtData);
  //   console.log(this.selectedDistrictData);
  //   // console.log(this.selectedDistrictData[1].districtData.selectedDistrictFromInput);
  //   // if(selectedDistrictFromInput === this.selectedDistrictData[1].)
  // }
  // 
}
