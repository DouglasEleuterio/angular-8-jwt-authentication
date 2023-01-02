import {Component, OnInit, ViewChild} from '@angular/core';
import {TipoDescarteService} from '../_services/tipo-descarte.service';
import { FormGroup, FormControl } from '@angular/forms';
import {TipoDescarteModel} from '../model/tipo-descarte-model';
import {NotifierService} from 'angular-notifier';
import {BaseComponent} from '../commons/BaseComponent';

@Component({
  selector: 'app-tipo-descarte',
  templateUrl: './tipo-descarte.component.html',
  styleUrls: ['./tipo-descarte.component.css']
})
export class TipoDescarteComponent extends BaseComponent implements OnInit {

  @ViewChild('closebutton', {static: false}) closebutton;

  entities: TipoDescarteModel[];
  form: FormGroup;
  tipoDescarteExcluir = new TipoDescarteModel() ;
  isEdicao = false;

  constructor(private tipoDescarteService: TipoDescarteService,
              notifier: NotifierService) {
    super(notifier);
  }

  ngOnInit() {
    this.createForm(new TipoDescarteModel());
    this.obtemValor();
    this.criarFormSearch();
  }

  tipoDescarteAexcluir(tipo: TipoDescarteModel): void {
    this.tipoDescarteExcluir = tipo;
  }

  excluirTipoDescarte(): void {
    this.tipoDescarteService.delete(this.tipoDescarteExcluir).subscribe(
      data =>  {
        this.closebutton.nativeElement.click();
        this.notifier.notify('success', 'Tipo Descarte: ' + this.tipoDescarteExcluir.nome + ' excluido!');
        this.obtemValor();
      },
      error => {
        this.closebutton.nativeElement.click();
        this.notifier.notify('error', error.error.message);
      }
    );
  }

  createForm(model: TipoDescarteModel) {
    this.form = new FormGroup({
      id: new FormControl(model.id),
      nome: new FormControl(model.nome),
      valor: new FormControl(model.valor),
      ativo: new FormControl(model.ativo)
    });
  }

  editar(entity: TipoDescarteModel): void {
    this.isEdicao = true;
    this.createForm(entity);
  }

  onSubmit() {
    this.tipoDescarteService.save(this.form).subscribe(
      data => {
        if (this.isEdicao) {
          this.notifier.notify('warning', 'Tipo de Descarte: ' + this.form.value.nome + ' Alterado' );
        } else {
          this.notifier.notify('success', 'Tipo de Descarte: ' + this.form.value.nome + ' Cadastrado' );
        }
        this.createForm(new TipoDescarteModel());
        this.obtemValor();
        this.isEdicao = false;
      }, err => {
        this.notifier.notify('error', err.error.message );
      }
    );
  }

  alterarSituacao(entity: TipoDescarteModel) {
    this.form.value.id = entity.id;
    this.form.value.ativo = (!entity.ativo);
    this.form.value.nome = entity.nome;
    this.form.value.valor = entity.valor;
    this.tipoDescarteService.save(this.form).subscribe(
      data => {
        this.notifier.notify('warning', 'Tipo de Descarte: ' + entity.nome + ' Alterado' );
        this.obtemValor();
      }, err => {
        this.notifier.notify('error', err.error.message );
      });
  }

  criarFormSearch() {
    this.filterGroup = new FormGroup({
      nomeFilter: new FormControl(''),
      statusFilter: new FormControl('')
    });
  }

  filter() {
    this.params = {nome: this.filterGroup.value.nomeFilter, ativo: this.filterGroup.value.statusFilter};
    this.obtemValor(this.params);
  }

  carregarEntidades(event?: any) {
    if (this.filterGroup.value.statusFilter === undefined || this.filterGroup.value.statusFilter === '') {
      this.filterGroup.value.statusFilter = true;
    }
    this.params = {nome: this.filterGroup.value.nomeFilter, ativo: this.filterGroup.value.statusFilter,
    page: event ? event.page - 1 : 0 };
    this.obtemValor(this.params);
  }

  getService(): any {
    return this.tipoDescarteService;
  }
}
