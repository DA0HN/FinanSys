import { Component, OnInit } from '@angular/core';
import { generateMonthOptions, generateYearOptions, Month, Year } from './report-parameters';
import { ReportCard } from '@finan$ys/pages/reports/reports-card';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: [ './reports.component.css' ],
})
export class ReportsComponent implements OnInit {

  months: Month[];
  years: Year[];
  reportCards: ReportCard[];

  constructor() {
  }

  ngOnInit(): void {
    this.loadMonthOptions();
    this.loadYearOptions();
    this.loadReportCards();
  }

  generateReports(): void {

  }

  private loadMonthOptions(): void {
    this.months = generateMonthOptions();
  }

  private loadYearOptions(): void {
    this.years = generateYearOptions();
  }

  private loadReportCards(): void {
    this.reportCards = [
      { label: 'TOTAL DE RECEITAS', value: '1500', cardClass: 'bg-success' },
      { label: 'TOTAL DE DESPESAS', value: '1000', cardClass: 'bg-danger' },
      { label: 'SALDO', value: '500', cardClass: 'bg-info' },
    ];
  }
}



