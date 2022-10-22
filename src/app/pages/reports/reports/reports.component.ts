import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { generateMonthOptions, generateYearOptions, Month, Year } from './report-parameters';
import { ReportCard } from '@finan$ys/pages/reports/components';
import { Category, CategoryService } from '@finan$ys/pages/categories/shared';
import { Entry, EntryService } from '@finan$ys/pages/entries/shared';
import currencyFormatter from 'currency-formatter';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: [ './reports.component.css' ],
})
export class ReportsComponent implements OnInit {

  @ViewChild('month') month: ElementRef = null;
  @ViewChild('year') year: ElementRef = null;

  categories: Category[] = [];
  entries: Entry[] = [];

  months: Month[];
  years: Year[];
  reportCards: ReportCard[];

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  revenueChartData: any;

  chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };


  constructor(private entryService: EntryService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.loadMonthOptions();
    this.loadYearOptions();
    this.loadCategories();
    this.loadReportCards();
  }

  generateReports(): void {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if ( !month || !year ) {
      alert('Você precisa selecionar o Mês e o Ano para gerar os relatórios');
      return;
    }

    this.entryService.getByMonthAndYear(month, year)
      .subscribe(this.setEntries.bind(this));
  }

  private loadMonthOptions(): void {
    this.months = generateMonthOptions();
  }

  private loadYearOptions(): void {
    this.years = generateYearOptions();
  }

  private loadReportCards(): void {
    this.reportCards = [
      { label: 'TOTAL DE RECEITAS', value: this.revenueTotal, cardClass: 'bg-success' },
      { label: 'TOTAL DE DESPESAS', value: this.expenseTotal, cardClass: 'bg-danger' },
      { label: 'SALDO', value: this.balance, cardClass: 'bg-info' },
    ];
  }

  private loadCategories(): void {
    this.categoryService.getAll()
      .subscribe(value => this.categories = value);
  }

  private setEntries(entries: Entry[]): void {
    this.entries = entries;
    this.calculateBalance();
    this.loadReportCards();
    this.setChartData();
  }

  private calculateBalance(): void {
    const revenueTotal = this.entries
      .filter(entry => entry.type === 'revenue')
      .map(entry => currencyFormatter.unformat(entry.amount, { code: 'BRL' }))
      .reduce((total, revenueCurrent) => total + revenueCurrent, 0);
    const expenseTotal = this.entries
      .filter(entry => entry.type === 'expense')
      .map(entry => currencyFormatter.unformat(entry.amount, { code: 'BRL' }))
      .reduce((total, expenseCurrent) => total + expenseCurrent, 0);
    const balance = revenueTotal - expenseTotal;
    this.revenueTotal = currencyFormatter.format(revenueTotal, { code: 'BRL' });
    this.expenseTotal = currencyFormatter.format(expenseTotal, { code: 'BRL' });
    this.balance = currencyFormatter.format(balance, { code: 'BRL' });
  }

  private setChartData(): void {

    this.revenueChartData = this.getChartData(
      'revenue',
      'Gráfico de Receitas',
      '#9CCC65',
    );
    this.expenseChartData = this.getChartData(
      'expense',
      'Gráfico de Despesa',
      '#e03131',
    );
  }

  private getChartData(entryType: string, title: string, color: string): any {
    const chartData = [];

    this.categories.forEach(category => {
      const revenueEntriesGroupedByCategory = this.entries.filter(entry => entry.categoryId === category.id && entry.type === entryType);
      if ( revenueEntriesGroupedByCategory.length > 0 ) {
        const totalAmount = revenueEntriesGroupedByCategory.map(entry => entry.amount).reduce((total, amount) => {
          return total + currencyFormatter.unformat(amount, { code: 'BRL' });
        }, 0);
        chartData.push({
          category: category.name,
          totalAmount,
        });
      }
    });

    return {
      labels: chartData.map(item => item.category),
      datasets: [ {
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.totalAmount),
      } ],
    };
  }


}



