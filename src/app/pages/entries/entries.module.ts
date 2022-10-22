import { NgModule } from '@angular/core';

import { EntriesRoutingModule } from './entries-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';
import { EntryFormComponent } from './entry-form';
import { EntryListComponent } from './entry-list';
import { EntryService } from './shared';
import { SharedModule } from '@finan$ys/shared/shared.module';


@NgModule({
  declarations: [
    EntryListComponent,
    EntryFormComponent,
  ],
  imports: [
    SharedModule,
    EntriesRoutingModule,
    CalendarModule,
    IMaskModule,
  ],
  providers: [
    EntryService,
  ],
})
export class EntriesModule {
}
