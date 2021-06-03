import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EntriesRoutingModule} from './entries-routing.module';
import {EntryService} from './shared';
import {EntryListComponent} from './entry-list';


@NgModule({
  declarations: [
    EntryListComponent
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
