import { Component, Input, OnInit } from '@angular/core';
import { Required } from '@finan$ys/shared/decorators';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: [ './page-header.component.css' ],
})
export class PageHeaderComponent implements OnInit {

  @Input() @Required title: string;
  @Input() btnLabel: string;
  @Input() btnLink: string;
  @Input() btnClass: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
