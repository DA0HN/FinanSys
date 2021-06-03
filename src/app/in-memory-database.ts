import {Observable} from 'rxjs';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Category} from '@/app/pages/categories/shared';


export class InMemoryDatabase implements InMemoryDbService {
  createDb(): {} | Observable<{}> | Promise<{}> {
    const categories: Category[] = [
      {id: 1, name: 'Moradia', description: 'Pagamentos de Contas da Casa'},
      {id: 1, name: 'Saúde', description: 'Plano de Saúde e Remédios'},
      {id: 1, name: 'Lazer', description: 'Cinema, parques, praia, etc'},
      {id: 1, name: 'Salário', description: 'Recebimento de Salário'},
      {id: 1, name: 'Freelas', description: 'Trabalhos como freelancer'},
    ];

    return {categories};
  }


}
