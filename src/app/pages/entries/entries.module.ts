import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EntriesRoutingModule} from './entries-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {IMaskModule} from 'angular-imask';
import {EntryFormComponent} from './entry-form';
import {EntryListComponent} from './entry-list';
import {EntryService} from './shared';


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
