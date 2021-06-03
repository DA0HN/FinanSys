import {Component, OnInit} from '@angular/core';
import {Entry, EntryService} from '@/app/pages/entries';

@Component({
  selector: 'app-category-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(private entryService: EntryService) {
  }

  ngOnInit(): void {

    this.entryService.getAll().subscribe(
      entries => this.entries = entries,
      _ => alert('Erro ao carregar a lista')
    );
  }

  deleteEntry(entryToRemove: Entry): void {
    const mustDelete = confirm('Você realmente deseja excluir este item?');

    if (mustDelete) {
      this.entryService.delete(entryToRemove).subscribe(
        () => this.entries = this.entries.filter(entry => entry !== entryToRemove),
        _ => alert(`Erro ao tentar excluir`)
      );
    }
  }
}
