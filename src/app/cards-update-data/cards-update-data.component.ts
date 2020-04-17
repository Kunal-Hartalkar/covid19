import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-cards-update-data',
  templateUrl: './cards-update-data.component.html',
  styleUrls: ['./cards-update-data.component.css']
})
export class CardsUpdateDataComponent implements OnInit {

@Input() title: string;
@Input() count: number;

  constructor() { }

  ngOnInit() {
  }

}
