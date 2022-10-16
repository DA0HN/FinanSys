import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { EntryService } from '@finan$ys/pages/entries/shared';
import { BaseResourceListComponent } from '@finan$ys/shared/components/base-resource-list';

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
