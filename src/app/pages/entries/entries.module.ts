import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EntriesRoutingModule} from './entries-routing.module';
import {EntryService} from './shared';
import {EntryListComponent} from './entry-list';
import {EntryFormComponent} from '@/app/pages/entries/entry-form';
import {ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {IMaskModule} from 'angular-imask';


@NgModule({
  declarations: [
    EntryListComponent,
    EntryFormComponent,
  ],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule,
  ],
  providers: [
    EntryService
  ]
})
export class EntriesModule {
}
