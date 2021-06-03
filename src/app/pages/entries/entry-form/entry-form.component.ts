import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Entry, EntryService} from '@/app/pages/entries/shared';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import toastr from 'toastr';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  entryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm = false;

  entry = new Entry();

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };


  constructor(private entryService: EntryService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
  }

  /**
   * Garante que será executado apenas após o componente estar completamente carregado.
   */
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm(): void {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
      this.createEntry();
    } else {
      this.updateEntry();
    }
  }

  private setCurrentAction(): void {
    const LAST_SEGMENT_URL = 0;
    if (this.route.snapshot.url[LAST_SEGMENT_URL].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildEntryForm(): void {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
  }

  private loadEntry(): void {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params =>
          this.entryService.getById(+params.get('id'))
        )
      ).subscribe(
        (entry) => {
          this.entry = entry;
          // binds loaded entry data to EntryForm
          this.entryForm.patchValue(entry);
        },
        _ => alert('Ocorreu um erro no servidor, tente mais tarde.')
      );
    }
  }

  private setPageTitle(): void {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de Novo Lançamento';
    } else {
      const entryName = this.entry.name || '';
      this.pageTitle = `Editando lançamento: ${entryName}`;
    }
  }

  private createEntry(): void {
    const newEntry = Object.assign(
      new Entry(),
      this.entryForm.value
    );

    this.entryService
      .create(newEntry)
      .subscribe(
        (entry) => this.actionsForSuccess(entry),
        error => this.actionsForError(error)
      );
  }

  private updateEntry(): void {
    const updatedEntry = Object.assign(
      new Entry(),
      this.entryForm.value
    );

    this.entryService
      .update(updatedEntry)
      .subscribe(
        (entry) => this.actionsForSuccess(entry),
        error => this.actionsForError(error)
      );
  }

  /**
   * Apresenta a mensagem de sucesso para o usuário. <br/>
   * Logo em seguida faz o redirecionamento do usuário para a tela de
   * edição utilizando como parâmetro da nova lançamento criada. <br/>
   * Desse modo, após criar a Lançamento o usuário irá poder atualizar os dados salvos.
   *
   * @param newEntry lançamento que foi criada
   * @private
   */
  private actionsForSuccess(newEntry: Entry): void {
    toastr.success('Solicitação processada com sucesso!');

    this.router
      .navigateByUrl('entries', {skipLocationChange: true})
      .then(() => this.router.navigate(['entries', newEntry.id, 'edit']));
  }

  /**
   * Apresenta mensagem de erro para o usuário. <br/>
   * Caso seja um erro do lado do servidor armazena as mensagens de erro.
   *
   * @param error objeto que contém as informações sobre o erro.
   * @private
   */
  private actionsForError(error): void {
    toastr.error('Ocorreu um erro ao processar a sua solicitação!');

    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente mais tarde.'];
    }
  }
}
