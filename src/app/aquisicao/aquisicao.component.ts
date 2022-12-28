import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../commons/BaseComponent';
import {NotifierService} from 'angular-notifier';
import {TransportadorService} from '../_services/transportador.service';
import {CtrModel} from "../model/ctr-model";
import {AquisicaoModel} from "../model/aquisicao-model";
import {ComboModel} from "../model/combo-model";
import {FormaPagamentoModel} from "../model/FormaPagamentoModel";
import {FormControl, FormGroup} from "@angular/forms";
import {TipoDescarteService} from "../_services/tipo-descarte.service";
import {AquisicaoService} from "../_services/aquisicao.service";
import {FormaPagamentoService} from "../_services/forma-pagamento.service";

@Component({
  selector: 'app-aquisicao',
  templateUrl: './aquisicao.component.html',
  styleUrls: ['./aquisicao.component.css']
})
export class AquisicaoComponent extends BaseComponent implements OnInit {
  transportadorSelecionado: any;
  transportadores: any;
  tipoDescarteSelecionado: any;
  descartes: any;
  aquisicao: AquisicaoModel;

  transportadorService: TransportadorService;
  tipoDescarteService: TipoDescarteService;
  aquisicaoService: AquisicaoService;
  formaPagamentoService: FormaPagamentoService;

  valorPago: any;
  formaPagamentoSelecionado: any;
  formasPagamento: any;

  constructor(notifierService: NotifierService,
              transportadorService: TransportadorService,
              tipoDescarteService: TipoDescarteService,
              aquisicaoService: AquisicaoService,
              formaPagamentoService: FormaPagamentoService) {
    super(notifierService);
    this.transportadorService = transportadorService;
    this.tipoDescarteService = tipoDescarteService;
    this.aquisicaoService = aquisicaoService;
    this.formaPagamentoService = formaPagamentoService;
  }

  vinculaTransportador() {

  }

  ngOnInit() {
    this.carregarTransportadores();
    this.carregaTipoDescarte();
    this.carregaFormaPagamento();
    this.aquisicao = new AquisicaoModel();
  }

  createForm(model: AquisicaoModel) {
    model.combo = new ComboModel();
    model.formaPagamento = new FormaPagamentoModel();
    this.form = new FormGroup({
      quantidadeAdquirida: new FormControl(model.quantidadeAdquirida),
      dataPagamento: new FormControl(model.dataPagamento),
      valorPago: new FormControl(model.valorPago),
      desconto: new FormControl(model.desconto)
    });
  }

  onSubmit() {
    this.aquisicaoService.save(this.aquisicao).subscribe(
      data => {
        this.notifier.notify('success', 'Aquisição criada!');
      }, err => {
        this.notifier.notify('error', err.error.message );
      }
    );
  }

  carregarTransportadores() {
    this.transportadorService.get().subscribe( transportadores => {
      this.transportadores = transportadores;
    });
  }

  carregaTipoDescarte() {
    this.tipoDescarteService.getAtivo().subscribe( data => {
      this.descartes = data;
    });
  }

  carregaFormaPagamento() {
    this.formaPagamentoService.get().subscribe( data => {
      data = this.limparFormasPagamento(data);
      this.formasPagamento = data;
    });
  }

  limpar() {
    alert('Funcionalidade não implementada');
  }

  private limparFormasPagamento(data: any) {
    data = data.filter( forma => forma.ativo);
    data = data.filter( forma => forma.nome !== 'Combo');
    return data;
  }

  calculaValorPago() {
    if (this.aquisicao.quantidadeAdquirida !== undefined ? this.aquisicao.quantidadeAdquirida : 0 &&
        this.aquisicao.combo.tipoDescarte !== undefined) {
        this.aquisicao.valorPago = this.aquisicao.quantidadeAdquirida * this.aquisicao.combo.tipoDescarte.valor;
    }
    this.atualizaDesconto();
  }

  public atualizaDesconto() {
    if (this.aquisicao.desconto !== undefined) {
      this.aquisicao.desconto = this.aquisicao.valorPago - (this.aquisicao.quantidadeAdquirida * this.aquisicao.combo.tipoDescarte.valor);
    }
  }

  carregarEntidades() {
  }
}
