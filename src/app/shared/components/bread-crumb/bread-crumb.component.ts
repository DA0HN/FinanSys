import { Component, Input, OnInit } from '@angular/core';
import { Required } from '@finan$ys/shared/decorators';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: [ './bread-crumb.component.css' ],
})
export class BreadCrumbComponent implements OnInit {

  @Input() @Required items: BreadCrumbItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }


  isLastItem(item: BreadCrumbItem): boolean {
    const index = this.items.indexOf(item) + 1;
    return index === this.items.length;
  }
}

export interface BreadCrumbItem {
  label: string;
  link?: string;
}


