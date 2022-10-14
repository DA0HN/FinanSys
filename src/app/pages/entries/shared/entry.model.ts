import { Category } from '@finan$ys/pages/categories/shared';
import { BaseResourceModel } from '@finan$ys/shared/models/base-resource.model';

export class Entry extends BaseResourceModel {
  static types = {
    expense: 'Despesa',
    revenue: 'Receita',
  };

  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public type?: string,
    public amount?: string,
    public date?: string,
    public paid?: boolean,
    public categoryId?: number,
    public category?: Category,
  ) {
    super();
  }

  get paidText(): string {
    return this.paid ? 'Pago' : 'Pendente';
  }

  static from(json: any): Entry {
    return Object.assign(new Entry(), json);
  }

}
