import { Component, OnInit } from '@angular/core';
import { DataextractService } from './dataextract.service';
import { DataModel } from './datamodel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'covid19';
  headings = [
    { title:  'Total cases', count: 0},
    { title:  'Active cases', count: 0},
    { title:  'Deaths', count: 0},
    { title:  'Recovered cases', count: 0},
];

s
  constructor(private service : DataextractService){}

  ngOnInit(){
  
  }
}
