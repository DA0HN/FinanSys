import { Component, OnInit } from '@angular/core';
import { Entry, EntryService } from '../shared';
import { BaseResourceListComponent } from '@finan$ys/shared/components';

@Component({
  selector: 'app-category-list',
  templateUrl: './entry-list.component.html',
  styleUrls: [ './entry-list.component.css' ],
})
export class EntryListComponent extends BaseResourceListComponent<Entry> implements OnInit {
  constructor(private entryService: EntryService) {
    super(entryService);
  }
}
