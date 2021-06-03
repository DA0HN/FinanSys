import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EntriesRoutingModule} from './entries-routing.module';
import {EntryService} from './shared';
import {EntryListComponent} from './entry-list';
import {EntryFormComponent} from '@/app/pages/entries/entry-form';


@NgModule({
  declarations: [
    EntryListComponent,
    EntryFormComponent,
  ],
  imports: [
    CommonModule,
    EntriesRoutingModule
  ],
  providers: [
    EntryService
  ]
})
export class EntriesModule {
}
