import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header[title][btnLabel][btnLink]',
  templateUrl: './page-header.component.html',
  styleUrls: [ './page-header.component.css' ],
})
export class PageHeaderComponent implements OnInit {

  @Input() title: string;
  @Input() btnLabel: string;
  @Input() btnLink: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
