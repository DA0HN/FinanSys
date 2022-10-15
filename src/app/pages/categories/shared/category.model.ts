import { BaseResourceModel } from '@finan$ys/shared/models';

export class Category extends BaseResourceModel {
  constructor(public id?: number, public name?: string, public description?: string) {
    super();
  }

  static from(json: any): Category {
    return json as Category;
  }
}
