import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header[title][btnLabel][btnLink][btnClass]',
  templateUrl: './page-header.component.html',
  styleUrls: [ './page-header.component.css' ],
})
export class PageHeaderComponent implements OnInit {

  @Input() title: string;
  @Input() btnLabel: string;
  @Input() btnLink: string;
  @Input() btnClass: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
