import {Component, OnInit, ViewChild} from '@angular/core';
import {FormaPagamentoService} from '../_services/forma-pagamento.service';
import {FormControl, FormGroup} from '@angular/forms';
import {FormaPagamentoModel} from '../model/FormaPagamentoModel';
import {NotifierService} from 'angular-notifier';
import {TipoDescarteModel} from "../model/tipo-descarte-model";

@Component({
  selector: 'app-forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.css']
})
export class FormaPagamentoComponent implements OnInit {

  @ViewChild('closebutton', {static: false}) closebutton;

  entities: FormaPagamentoModel[];
  form: FormGroup;
  errorMessage = '';
  formaPagamento = new FormaPagamentoModel();

  formaPagamentoService: FormaPagamentoService;
  private readonly notifier: NotifierService;
  private isEdicao: boolean;

  constructor(formaPagamentoService: FormaPagamentoService,
              notifier: NotifierService) {
    this.formaPagamentoService = formaPagamentoService;
    this.notifier = notifier;
  }

  ngOnInit() {
    this.createForm(new FormaPagamentoModel());
    this.obtemValor();
  }

  createForm(model: FormaPagamentoModel) {
    this.form = new FormGroup({
      id: new FormControl(model.id),
      nome: new FormControl(model.nome),
      ativo: new FormControl(model.ativo)
    });
  }

  obtemValor() {
    this.formaPagamentoService.get().subscribe(
      data => {
        this.entities = data;
      }, err => {
        this.errorMessage = err.error.message;
      });
  }

  onSubmit() {
    this.formaPagamentoService.save(this.form).subscribe(
      data => {
        this.createForm(new FormaPagamentoModel());
        this.obtemValor();
      }, err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  situacao(status: boolean): any {
    if (status === true) {
      return 'Ativo';
    } else {
      return 'Inativo';
    }
  }

  alterarSituacao() {
    this.formaPagamentoService.alteraSituacao(this.formaPagamento).subscribe(
      data => {
        this.closebutton.nativeElement.click();
        this.notifier.notify('success', 'Tipo Pagamento: ' + this.formaPagamento.nome + ' alterado!');
        this.obtemValor();
      }, err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  prepararAlteracao(entity: FormaPagamentoModel) {
    this.formaPagamento = entity;
  }

  editar(entity: FormaPagamentoModel): void {
    this.isEdicao = true;
    this.createForm(entity);
  }}
