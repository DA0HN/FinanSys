import { AfterContentChecked, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';
import { BaseResourceModel } from '@finan$ys/shared/models/base-resource.model';
import { BaseResourceService } from '@finan$ys/shared/services/base-resource.service';


export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string;
  form: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm = false;
  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  protected constructor(
    protected injector: Injector,
    protected service: BaseResourceService<T>,
    protected formMapper: (json) => T,
  ) {
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.formBuilder = injector.get(FormBuilder);
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  /**
   * Garante que será executado apenas após o componente estar completamente carregado.
   */
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm(): void {
    this.submittingForm = true;

    if ( this.currentAction === 'new' ) {
      this.createResource();
    } else {
      this.updateResource();
    }
  }

  protected abstract newPageTitle(): string;

  protected abstract editPageTitle(): string;

  protected abstract buildResourceForm(): void;

  protected setCurrentAction(): void {
    const LAST_SEGMENT_URL = 0;
    if ( this.route.snapshot.url[LAST_SEGMENT_URL].path === 'new' ) {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }


  protected loadResource(): void {
    if ( this.currentAction === 'edit' ) {
      this.route.paramMap.pipe(
        switchMap(params =>
          this.service.getById(+params.get('id')),
        ),
      ).subscribe(
        (resource) => {
          this.form.patchValue(resource);
        },
        _ => alert('Ocorreu um erro no servidor, tente mais tarde.'),
      );
    }
  }

  protected setPageTitle(): void {
    if ( this.currentAction === 'new' ) {
      this.pageTitle = this.newPageTitle();
      return;
    }
    if ( this.currentAction === 'edit' ) {
      this.pageTitle = this.editPageTitle();
      return;
    }
    this.pageTitle = '';
  }

  protected createResource(): void {
    const newResource = this.formMapper(this.form.value);

    this.service
      .create(newResource)
      .subscribe(
        (category) => this.actionsForSuccess(category),
        error => this.actionsForError(error),
      );
  }

  protected updateResource(): void {
    const updatedResource = this.formMapper(this.form.value);

    this.service
      .update(updatedResource)
      .subscribe(
        (resource) => this.actionsForSuccess(resource),
        error => this.actionsForError(error),
      );
  }

  /**
   * Apresenta a mensagem de sucesso para o usuário. <br/>
   * Logo em seguida faz o redirecionamento do usuário para a tela de
   * edição utilizando como parâmetro da nova categoria criada. <br/>
   * Desse modo, após criar a Categoria o usuário irá poder atualizar os dados salvos.
   *
   * @param resource categoria que foi criada
   * @protected
   */
  protected actionsForSuccess(resource: T): void {
    toastr.success('Solicitação processada com sucesso!');
    const baseComponentPath = this.route.snapshot.parent.url[0].path;
    this.router
      .navigateByUrl(baseComponentPath, { skipLocationChange: true })
      .then(() => this.router.navigate([ baseComponentPath, resource.id, 'edit' ]));
  }

  /**
   * Apresenta mensagem de erro para o usuário. <br/>
   * Caso seja um erro do lado do servidor armazena as mensagens de erro.
   *
   * @param error objeto que contém as informações sobre o erro.
   * @protected
   */
  protected actionsForError(error): void {
    toastr.error('Ocorreu um erro ao processar a sua solicitação!');

    this.submittingForm = false;

    if ( error.status === 422 ) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = [ 'Falha na comunicação com o servidor. Por favor, tente mais tarde.' ];
    }
  }


}
