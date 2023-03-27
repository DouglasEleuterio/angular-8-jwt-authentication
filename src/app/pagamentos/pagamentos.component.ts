import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../commons/BaseComponent';
import {FormBuilder, FormControl} from '@angular/forms';
import {PagamentoService} from '../_services/pagamento.service';
import {TransportadorService} from '../_services/transportador.service';
import {TransportadorModel} from '../model/transportador-model';
import {FormaPagamentoModel} from '../model/FormaPagamentoModel';
import {InstituicaoBancariaModel} from '../model/instituicaobancaria-model';
import {FormaPagamentoService} from '../_services/forma-pagamento.service';
import {InstituicaoBancariaService} from '../_services/instituicao.bancaria.service';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.css']
})
export class PagamentosComponent extends BaseComponent implements OnInit {

  protected searchParams = {
    ativo: '',
    formaPagamento: new FormaPagamentoModel(),
    instituicaoBancaria: new InstituicaoBancariaModel()
    // origem: '',
    // transportadoraId: '',
    // numeroCtr: '',
    // dataDe: '',
    // dataAte: ''
  };

  transportadores: TransportadorModel[];
  formasPagamento: FormaPagamentoModel[];
  instituicaoBancaria: InstituicaoBancariaModel[];

  ngOnInit() {
    this.criarFormSearch();
    // this.carregarTransportadores();
    this.obtemValor();
    this.carregarFormaPagamento();
    this.carregarIBancaria();
  }

  constructor(private pagamentoService: PagamentoService,
              private transportadorService: TransportadorService,
              private formaPagamentoService: FormaPagamentoService,
              private instituicaoBancariaService: InstituicaoBancariaService,
              private fb: FormBuilder) {
    super(null, pagamentoService);
  }

  criarFormSearch() {
    this.filterGroup = this.fb.group({
      ativo: new FormControl(''),
      formaPagamento: new FormControl(''),
      instituicaoBancaria: new FormControl(''),
      // origem: new FormControl(''),
      // transportadoraId: new FormControl(''),
      // ctr: new FormControl(''),
      // dataDe: new FormControl(''),
      // dataAte: new FormControl(''),
    });
  }

  getSearchParams(event: any) {
    this.searchParams.formaPagamento.id = this.filterGroup.value.formaPagamento;
    this.searchParams.ativo = this.filterGroup.value.ativo;
    this.searchParams.instituicaoBancaria.id = this.filterGroup.value.instituicaoBancaria;
    return this.searchParams;
  }

  carregarTransportadores() {
    this.transportadorService.get().subscribe( transportadores => {
      this.transportadores = transportadores;
    });
  }

  carregarFormaPagamento() {
    this.formaPagamentoService.get().subscribe( formaPgto => {
      this.formasPagamento = formaPgto;
    });
  }

  carregarIBancaria() {
    this.instituicaoBancariaService.get().subscribe( iBancaria => {
      this.instituicaoBancaria = iBancaria;
    });
  }

  getFilters(event?: any): any {
    return {page: event ? event.page - 1 : 0 , nomeFiler: new FormControl('')};
  }

  filtrar() {
    this.handlePageChange(0);
  }
}
