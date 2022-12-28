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
import {Router} from '@angular/router';
import {MotoristaService} from '../_services/motorista.service';
import {MotoristaModel} from '../model/motorista-model';

@Component({
  selector: 'app-ctr',
  templateUrl: './ctr.component.html',
  styleUrls: ['./ctr.component.css']
})
export class CtrComponent implements OnInit {

  //Veículos
  currentIndex = -1;
  placa = '';
  modelo = '';
  currentTutorial = null;
  page: number;
  count: number;

  veiculoService: VeiculoService;
  transportadorService: TransportadorService;
  geradorService: GeradorService;
  destinatarioService: DestinatarioService;
  tipoDescarteService: TipoDescarteService;
  formaPagamentoService: FormaPagamentoService;
  motoristaService: MotoristaService;
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
  formaPagamentoSelecionado: FormaPagamentoModel = new FormaPagamentoModel();

  pagamentosAdicionado: PagamentoModel[] = [];
  descartesAdicionado: TipoDescarteModel[] = [];

  motoristas: MotoristaModel[];
  motoristaSelecionado: MotoristaModel;

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
              motoristaService: MotoristaService,
              notifier: NotifierService,
              private router: Router
  ) {
    this.veiculoService = veiculoService;
    this.transportadorService = transportadorService;
    this.geradorService = geradorService;
    this.destinatarioService = destinatarioService;
    this.tipoDescarteService = tipoDescarteService;
    this.motoristaService = motoristaService;
    this.formaPagamentoService = formaPagamentoService;
    this.ctrService = ctrService;
    this.notifier = notifier;
  }

  ngOnInit() {
    this.ctr = new CtrModel();
    this.carregarVeiculos();
    this.carregarTransportadores();
    this.carregarGerador();
    this.carregarDestinatario();
    this.carregaTipoDescarte();
    this.carregaFormaPagamento();
    this.carregarMotoristas();
  }

  createForm(model: CtrModel) {
    model.veiculo = new VeiculoModel();
    model.transportador = new TransportadorModel();
    model.gerador = new GeradorModel();
    model.destinatario = new DestinatarioModel();
    model.motorista = new MotoristaModel();
    this.form = new FormGroup({
      veiculo: new FormControl(model.veiculo),
      transportador: new FormControl(model.transportador),
      gerador: new FormControl(model.gerador),
      destinatario: new FormControl(model.destinatario),
      motorista: new FormControl(model.motorista),
    });
  }

  carregarVeiculos() {
    let params = {};
    if (this.placa) {
      params = {placa: this.placa};
    }
    if (this.modelo) {
      params = {modelo: this.modelo};
    }
    if (this.page) {
      params = {page: this.page - 1};
    }
    this.veiculoService.get(params).subscribe(data => {
        this.veiculos = data.content;
        this.count = data.totalElements;
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

  carregarMotoristas() {
    this.motoristaService.get().subscribe( data => {
      this.motoristas = data;
    });
  }

  carregarDestinatario() {
    this.destinatarioService.get().subscribe( data => {
      this.destinatarios = data;
    });
  }

  carregaTipoDescarte() {
    this.tipoDescarteService.getAtivo().subscribe( data => {
      this.descartes = data;
    });
  }

  carregaFormaPagamento() {
    this.formaPagamentoService.get().subscribe( data => {
      this.formasPagamento = data.filter( forma => forma.ativo);
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
    this.validaFormaPagamento();
  }

  adicionarDescartes() {
    let tipoDescarteModel = this.tipoDescarteSelecionado;
    this.descartesAdicionado.push(tipoDescarteModel);
    this.ctr.tipoDescartes = this.descartesAdicionado;
    this.tipoDescarteSelecionado = new TipoDescarteModel();
    this.tipoDescarteSelecionado = null;
  }

  onSubmit() {
    if (this.validarForm()) {
      this.ctrService.save(this.ctr).subscribe(
        data => {
          this.notifier.notify('success', 'CTR: criado!');
          this.limpar();
          this.routerLink('invoice', data.id);
        }, err => {
          this.notifier.notify('error', err.error.message );
        }
      );
    }
  }

  routerLink(route: string, id: string) {
    this.router.navigate([route, id]);
  }

  vinculaVeiculo(veiculo: any, i: number) {
    this.currentTutorial = veiculo;
    this.currentIndex = i;
    this.veiculoSelecionado = veiculo;
    this.ctr.veiculo = this.veiculoSelecionado;
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

  vinculaMotorista() {
    this.ctr.motorista = this.motoristaSelecionado;
  }

  valorTotalPagamentos(): any {
    let total = 0;
    this.ctr.pagamentos.forEach(value => total += value.valor);
    return total;
  }

  excluirPagamento(pagamento: PagamentoModel) {
    this.ctr.pagamentos.splice(this.ctr.pagamentos.indexOf(pagamento), 1);
  }

  excluirTipoDescarte(tipoDescarte: TipoDescarteModel) {
    this.ctr.tipoDescartes.splice(this.ctr.tipoDescartes.indexOf(tipoDescarte), 1);
  }

  limpar() {
    this.ctr.pagamentos.length = 0;
    this.ctr = new CtrModel();
    this.veiculoSelecionado = new VeiculoModel();
    this.transportadorSelecionado = new TransportadorModel();
    this.geradorSelecionado = new GeradorModel();
    this.destinatarioSelecionado = new DestinatarioModel();
    this.motoristaSelecionado = new MotoristaModel();
    this.tipoDescarteSelecionado = null;
    this.descartesAdicionado.length = 0;
  }

  validaFormaPagamento() {
    let possuiCombo = false;
    this.ctr.pagamentos.forEach(forma => {
      if (forma.formaPagamento.nome === 'Combo') {
        possuiCombo = true;
      }
    });
    if (possuiCombo && this.ctr.pagamentos.length > 1) {
      this.ctr.pagamentos.length = 0;
      this.notifier.notify('error', 'Não é possível adicionar mais de uma forma de pagamento quando Combo selecionado!');
    }
  }

  validarForm() {
    if (this.ctr.pagamentos.length === 0) {
      this.notifier.notify('error', 'É necessário adicionar pelo menos uma forma de pagamento!');
      return false;
    }
    this.ctr.pagamentos.forEach( pagamento => {
      if (pagamento.valor === undefined || pagamento.valor === 0) {
        this.notifier.notify('error', 'Valor de pagamento não pode ser 0!');
        return false;
      }
    });
    if (this.ctr.tipoDescartes.length === 0) {
      this.notifier.notify('error', 'É necessário adicionar pelo menos um tipo de descarte!');
      return false;
    }
    if (this.veiculoSelecionado === undefined || this.veiculoSelecionado.id === undefined) {
      this.notifier.notify('error', 'É necessário selecionar um veículo!');
      return false;
    }
    if (this.motoristaSelecionado === undefined || this.motoristaSelecionado.id === undefined) {
      this.notifier.notify('error', 'É necessário selecionar um motorista!');
      return false;
    }
    if (this.transportadorSelecionado === undefined || this.transportadorSelecionado.id === undefined) {
      this.notifier.notify('error', 'É necessário selecionar um transportador!');
      return false;
    }
    if (this.destinatarioSelecionado === undefined || this.destinatarioSelecionado.id === undefined) {
      this.notifier.notify('error', 'É necessário selecionar um destinatario!');
      return false;
    }

    return true;
  }

  calcularValor() {
    if (this.tipoDescarteSelecionado !== undefined && this.tipoDescarteSelecionado.id !== undefined) {
      this.valorPagamento = this.tipoDescarteSelecionado.valor;
    }
  }

  handlePageChange(event) {
    this.page = event;
    this.carregarVeiculos();
  }
}
