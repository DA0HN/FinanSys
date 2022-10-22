import { Component, OnInit } from '@angular/core';
import { generateMonthOptions, generateYearOptions, Month, Year } from './report-parameters';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: [ './reports.component.css' ],
})
export class ReportsComponent implements OnInit {

  months: Month[];
  years: Year[];

  constructor() {
  }

  ngOnInit(): void {
    this.loadMonthOptions();
    this.loadYearOptions();
  }

  generateReports(): void {

  }

  private loadMonthOptions(): void {
    this.months = generateMonthOptions();
  }

  private loadYearOptions(): void {
    this.years = generateYearOptions();
  }
}



