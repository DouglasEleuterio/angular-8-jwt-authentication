import { Component, OnInit } from '@angular/core';
import {VeiculoModel} from '../model/veiculo-model';
import {VeiculoService} from '../_services/veiculo.service';
import {TransportadorModel} from '../model/transportador-model';
import {TransportadorService} from '../_services/transportador.service';
import {DestinatarioModel} from '../model/destinatario-model';
import {GeradorModel} from '../model/gerador-model';
import {GeradorService} from '../_services/gerador.service';
import {DestinatarioService} from '../_services/destinatario.service';
import {TipoDescarteModel} from '../model/tipo-descarte-model';
import {TipoDescarteService} from '../_services/tipo-descarte.service';
import {PagamentoModel} from '../model/pagamento-model';
import {FormaPagamentoModel} from '../model/FormaPagamentoModel';
import {FormaPagamentoService} from '../_services/forma-pagamento.service';
import {FormControl, FormGroup} from '@angular/forms';
import {CtrModel} from '../model/ctr-model';
import {CtrService} from '../_services/ctr.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-ctr',
  templateUrl: './ctr.component.html',
  styleUrls: ['./ctr.component.css']
})
export class CtrComponent implements OnInit {

  veiculoService: VeiculoService;
  transportadorService: TransportadorService;
  geradorService: GeradorService;
  destinatarioService: DestinatarioService;
  tipoDescarteService: TipoDescarteService;
  formaPagamentoService: FormaPagamentoService;
  ctrService: CtrService;

  veiculos: VeiculoModel[];
  veiculoSelecionado: VeiculoModel;

  transportadores: TransportadorModel[];
  transportadorSelecionado: TransportadorModel;

  geradores: GeradorModel[];
  geradorSelecionado: GeradorModel;

  destinatarios: DestinatarioModel[];
  destinatarioSelecionado: DestinatarioModel;

  descartes: TipoDescarteModel[];
  tipoDescarteSelecionado: TipoDescarteModel;

  formasPagamento: FormaPagamentoModel[];
  formaPagamentoSelecionado: FormaPagamentoModel;

  pagamentosAdicionado: PagamentoModel[] = [];

  valorPagamento: number;

  form: FormGroup;

  ctr: CtrModel;

  private readonly notifier: NotifierService;

  constructor(veiculoService: VeiculoService,
              transportadorService: TransportadorService,
              geradorService: GeradorService,
              destinatarioService: DestinatarioService,
              tipoDescarteService: TipoDescarteService,
              formaPagamentoService: FormaPagamentoService,
              ctrService: CtrService,
              notifier: NotifierService
  ) {
    this.veiculoService = veiculoService;
    this.transportadorService = transportadorService;
    this.geradorService = geradorService;
    this.destinatarioService = destinatarioService;
    this.tipoDescarteService = tipoDescarteService;
    this.formaPagamentoService = formaPagamentoService;
    this.ctrService = ctrService;
    this.notifier = notifier;
  }

  ngOnInit() {
    this.notifier.notify('success', '');
    this.ctr = new CtrModel();
    this.carregarVeiculos();
    this.carregarTransportadores();
    this.carregarGerador();
    this.carregarDestinatario();
    this.carregaTipoDescarte();
    this.carregaFormaPagamento();
  }

  createForm(model: CtrModel) {
    model.veiculo = new VeiculoModel();
    model.transportador = new TransportadorModel();
    model.gerador = new GeradorModel();
    model.destinatario = new DestinatarioModel();
    model.tipoDescarte = new TipoDescarteModel();
    this.form = new FormGroup({
      veiculo: new FormControl(model.veiculo),
      transportador: new FormControl(model.transportador),
      gerador: new FormControl(model.gerador),
      destinatario: new FormControl(model.destinatario),
      descarte: new FormControl(model.tipoDescarte),
    });
  }

  carregarVeiculos() {
    this.veiculoService.get().subscribe(data => {
        this.veiculos = data;
    });
  }

  carregarTransportadores() {
    this.transportadorService.get().subscribe( transportadores => {
      this.transportadores = transportadores;
    });
  }

  carregarGerador() {
    this.geradorService.get().subscribe( data => {
      this.geradores = data;
    });
  }

  carregarDestinatario() {
    this.destinatarioService.get().subscribe( data => {
      this.destinatarios = data;
    });
  }

  carregaTipoDescarte() {
    this.tipoDescarteService.get().subscribe( data => {
      this.descartes = data;
    });
  }

  carregaFormaPagamento() {
    this.formaPagamentoService.get().subscribe( data => {
      this.formasPagamento = data;
    });
  }

  adicionarPagamento() {
    let pagamentoModel = new PagamentoModel();
    pagamentoModel.dataPagamento = new Date();
    pagamentoModel.formaPagamento = this.formaPagamentoSelecionado;
    pagamentoModel.ativo = true;
    pagamentoModel.valor = this.valorPagamento;
    this.pagamentosAdicionado.push(pagamentoModel);
    this.ctr.pagamentos = this.pagamentosAdicionado;
    this.formaPagamentoSelecionado = new FormaPagamentoModel();
    this.valorPagamento = null;
  }

  onSubmit() {
    this.ctrService.save(this.ctr).subscribe(
      data => {
        this.notifier.notify('success', 'CTR: criado!');
        this.limpar();
      }, err => {
        this.notifier.notify('error', err.error.message );
      }
    );
  }

  vinculaVeiculo() {
    this.ctr.veiculo = this.veiculoSelecionado;
    console.log(this.ctr);
  }

  vinculaTransportador() {
    this.ctr.transportador = this.transportadorSelecionado;
  }

  vinculaGerador() {
    this.ctr.gerador = this.geradorSelecionado;
  }

  vinculaDestinatario() {
    this.ctr.destinatario = this.destinatarioSelecionado;
  }

  vinculaTipoDescarte() {
    this.ctr.tipoDescarte = this.tipoDescarteSelecionado;
  }

  valorTotalPagamentos(): any {
    let total = 0;
    this.ctr.pagamentos.forEach(value => total += value.valor);
    return total;
  }

  excluirPagamento(pagamento: PagamentoModel) {
    this.ctr.pagamentos.splice(this.ctr.pagamentos.indexOf(pagamento), 1);
  }

  limpar() {
    this.ctr.pagamentos.length = 0;
    this.ctr = new CtrModel();
    this.veiculoSelecionado = new VeiculoModel();
    this.transportadorSelecionado = new TransportadorModel();
    this.geradorSelecionado = new GeradorModel();
    this.destinatarioSelecionado = new DestinatarioModel();
    this.tipoDescarteSelecionado = new TipoDescarteModel();
  }
}
