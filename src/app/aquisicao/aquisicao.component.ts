import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../commons/BaseComponent';
import {NotifierService} from 'angular-notifier';
import {TransportadorService} from '../_services/transportador.service';
import {AquisicaoModel} from '../model/aquisicao-model';
import {ComboModel} from '../model/combo-model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {TipoDescarteService} from '../_services/tipo-descarte.service';
import {AquisicaoService} from '../_services/aquisicao.service';
import {FormaPagamentoService} from '../_services/forma-pagamento.service';
import {Router} from '@angular/router';
import {InstituicaoBancariaService} from '../_services/instituicao.bancaria.service';
import {PagamentoModel} from '../model/pagamento-model';

@Component({
  selector: 'app-aquisicao',
  templateUrl: './aquisicao.component.html',
  styleUrls: ['./aquisicao.component.css']
})
export class AquisicaoComponent extends BaseComponent implements OnInit {
  transportadores: any;
  descartes: any;
  formasPagamento: any;
  instituicaoBancaria: any;
  aquisicao: AquisicaoModel;

  valorPago: any;
  valorDesconto = 0;

  constructor(notifierService: NotifierService,
              private transportadorService: TransportadorService,
              private tipoDescarteService: TipoDescarteService,
              private aquisicaoService: AquisicaoService,
              private formaPagamentoService: FormaPagamentoService,
              private instituicaoBancariaService: InstituicaoBancariaService,
              private formBuilder: FormBuilder,
              private router: Router) {
    super(notifierService);
  }

  vinculaTransportador() {

  }

  ngOnInit() {
    this.aquisicao = new AquisicaoModel();
    this.createFormNew(new AquisicaoModel());
    this.carregarTransportadores();
    this.carregaTipoDescarte();
    this.carregaFormaPagamento();
    this.carregainstituicaoBancaria();
  }

  createFormNew(model: AquisicaoModel) {
    this.form = this.formBuilder.group({
      id: [model.id, null],
      transportador: [model.combo.transportador, null],
      tipoDescarte: [model.combo.tipoDescarte, null],
      quantidadeAdquirida: [model.quantidadeAdquirida, null],
      dataPagamento: [model.dataPagamento, null],
      valorPago: [model.valorPago, null],
      desconto: [model.desconto, null],
      formaPagamento: [model.pagamento.formaPagamento, null],
      instituicaoBancaria: [model.pagamento.instituicaoBancaria, null]
    });
  }

  onSubmit() {
    this.aquisicao = this.form.value;
    this.aquisicao.combo = new ComboModel();
    this.aquisicao.combo.tipoDescarte = this.form.value.tipoDescarte;
    this.aquisicao.combo.transportador = this.form.value.transportador;
    this.aquisicao.combo.saldo = this.form.value.quantidadeAdquirida;
    this.aquisicao.combo.ativo = true;
    const pagamento = new PagamentoModel();
    pagamento.dataPagamento = this.form.value.dataPagamento,
      pagamento.valor = this.form.value.valorPago,
      pagamento.formaPagamento = this.form.value.formaPagamento,
      pagamento.ativo = true,
      pagamento.instituicaoBancaria = this.form.value.instituicaoBancaria;
    this.aquisicao.combo.pagamentos = [ pagamento ];
    this.aquisicaoService.save(this.form.value).subscribe(
      data => {
        this.notifier.notify('success', 'Aquisição criada!');
        this.router.navigate(['/combo']);
      }, err => {
        this.notifier.notify('error', err.error.message);
      }
    );
  }

  routerLink(route: string) {
    this.router.navigate([route]);
  }

  carregarTransportadores() {
    this.transportadorService.getAtivos().subscribe(transportadores => {
      this.transportadores = transportadores;
    });
  }

  carregaTipoDescarte() {
    this.tipoDescarteService.getAtivos().subscribe(data => {
      this.descartes = data;
    });
  }

  carregaFormaPagamento() {
    this.formaPagamentoService.getAtivos().subscribe(data => {
      data = this.limparFormasPagamento(data);
      this.formasPagamento = data;
    });
  }
  carregainstituicaoBancaria() {
    this.instituicaoBancariaService.getAtivos().subscribe(data => {
      this.instituicaoBancaria = data;
    });
  }

  limpar() {
    this.createFormNew(new AquisicaoModel());
  }

  private limparFormasPagamento(data: any) {
    data = data.filter(forma => forma.nome !== 'Combo');
    return data;
  }


  calculaValorPago() {
    this.aquisicao = this.form.value;
    this.aquisicao.combo = new ComboModel();
    this.aquisicao.combo.tipoDescarte = this.form.value.tipoDescarte;
    if (this.aquisicao.quantidadeAdquirida !== undefined ? this.aquisicao.quantidadeAdquirida : 0 &&
      this.aquisicao.combo.tipoDescarte !== undefined) {
      this.aquisicao.valorPago = this.aquisicao.quantidadeAdquirida * this.aquisicao.combo.tipoDescarte.valor;
    }
    this.atualizaDesconto();
  }

  public atualizaDesconto() {
    if (this.aquisicao.valorPago !== undefined && this.aquisicao.valorPago !== null) {
      this.valorDesconto = this.aquisicao.valorPago - this.aquisicao.quantidadeAdquirida * this.aquisicao.combo.tipoDescarte.valor;
    }
  }

  getService(): any {
    return this.aquisicaoService;
  }

  getSearchParams(event: any) {
    throw new Error('Method not implemented.');
  }
}
