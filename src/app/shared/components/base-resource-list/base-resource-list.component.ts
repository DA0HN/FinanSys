import { Component, OnInit } from '@angular/core';
import { BaseResourceModel } from '@finan$ys/shared/models';
import { BaseResourceService } from '@finan$ys/shared/services';

@Component({
  template: '',
})
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  constructor(protected service: BaseResourceService<T>) {
  }

  ngOnInit(): void {
    this.service.getAll().subscribe(
      resources => {
        resources.sort((a, b) => b.id - a.id);
        this.resources = resources;
      },
      _ => alert('Erro ao carregar a lista'),
    );
  }

  deleteResource(resourceToRemove: T): void {
    const mustDelete = confirm('Você realmente deseja excluir este item?');

    if ( mustDelete ) {
      this.service.delete(resourceToRemove).subscribe(
        () => this.resources = this.resources.filter(resource => resource !== resourceToRemove),
        _ => alert(`Erro ao tentar excluir`),
      );
    }
  }
}


