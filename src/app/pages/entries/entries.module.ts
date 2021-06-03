import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EntriesRoutingModule} from './entries-routing.module';
import {EntryService} from '@/app/pages/entries/shared/entry.service';


@NgModule({
  declarations: [],
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
