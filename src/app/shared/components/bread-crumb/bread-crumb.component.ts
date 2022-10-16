import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: [ './bread-crumb.component.css' ],
})
export class BreadCrumbComponent implements OnInit {

  @Input() items: BreadCrumbItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }


  isLastItem(item: BreadCrumbItem): boolean {
    const index = this.items.indexOf(item) + 1;
    return index === this.items.length;
  }
}

interface BreadCrumbItem {
  label: string;
  link?: string;
}


