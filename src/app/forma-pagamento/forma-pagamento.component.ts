import {Component, OnInit, ViewChild} from '@angular/core';
import {FormaPagamentoService} from '../_services/forma-pagamento.service';
import {FormControl, FormGroup} from '@angular/forms';
import {FormaPagamentoModel} from '../model/FormaPagamentoModel';
import {NotifierService} from 'angular-notifier';
import {BaseComponent} from '../commons/BaseComponent';

@Component({
  selector: 'app-forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.css']
})
export class FormaPagamentoComponent extends BaseComponent implements OnInit {

  @ViewChild('closebutton', {static: false}) closebutton;

  entities: FormaPagamentoModel[];
  form: FormGroup;
  errorMessage = '';
  formaPagamento = new FormaPagamentoModel();
  private isEdicao: boolean;

  constructor(private formaPagamentoService: FormaPagamentoService,
              notifier: NotifierService) {
    super(notifier);
  }

  ngOnInit() {
    this.formaPagamento = new FormaPagamentoModel();
    this.obtemValor();
    this.criarFormSearch();
  }


  onSubmit() {
    this.formaPagamentoService.save(this.formaPagamento).subscribe(
      data => {
        this.formaPagamento = new FormaPagamentoModel();
        this.notifier.notify('success', 'Forma pagamento salva!');
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
        this.notifier.notify('success', 'Forma Pagamento: ' + this.formaPagamento.nome + ' alterado!');
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
    this.formaPagamento = new FormaPagamentoModel();
    this.formaPagamento = {...entity};
    this.isEdicao = true;
    this.formaPagamento.id = entity.id;
  }

  criarFormSearch() {
    this.filterGroup = new FormGroup({
      nomeFilter: new FormControl(''),
      statusFilter: new FormControl('')
    });
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
    return this.formaPagamentoService;
  }
}
