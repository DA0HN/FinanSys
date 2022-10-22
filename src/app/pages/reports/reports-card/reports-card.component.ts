import { Component, Input, OnInit } from '@angular/core';
import { Required } from '@finan$ys/shared/decorators';

@Component({
  selector: 'app-reports-card',
  templateUrl: './reports-card.component.html',
  styleUrls: [ './reports-card.component.css' ],
})
export class ReportsCardComponent implements OnInit {

  @Input() @Required cards: ReportCard[];

  constructor() {
  }

  ngOnInit(): void {
  }

}

export interface ReportCard {
  label: string;
  value: string;
  cardClass: string;
}

