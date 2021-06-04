import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryListComponent } from '@finan$ys/pages/entries/entry-list';
import { EntryFormComponent } from '@finan$ys/pages/entries/entry-form';

const routes: Routes = [
  {
    path: '',
    component: EntryListComponent
  },
  {
    path: 'new',
    component: EntryFormComponent
  },
  {
    path: ':id/edit',
    component: EntryFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule {
}
