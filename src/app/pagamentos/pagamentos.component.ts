import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../commons/BaseComponent';
import {FormBuilder, FormControl} from '@angular/forms';
import {PagamentoService} from '../_services/pagamento.service';
import {TransportadorService} from '../_services/transportador.service';
import {TransportadorModel} from '../model/transportador-model';
import {FormaPagamentoModel} from '../model/FormaPagamentoModel';
import {InstituicaoBancariaModel} from '../model/instituicaobancaria-model';
import {FormaPagamentoService} from '../_services/forma-pagamento.service';
import {InstituicaoBancariaService} from '../_services/instituicao.bancaria.service';
import {PagamentoModel} from '../model/pagamento-model';
import {CtrModel} from '../model/ctr-model';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.css']
})
export class PagamentosComponent extends BaseComponent implements OnInit, AfterViewInit {

  protected searchParams = {
    ativo: '',
    formaPagamento: new FormaPagamentoModel(),
    instituicaoBancaria: new InstituicaoBancariaModel(),
    // origem: '',
    //  pagamento: new PagamentoModel(),
    // numeroCtr: '',
    dataPagamento: '',
  };

  transportadores: TransportadorModel[];
  formasPagamento: FormaPagamentoModel[];
  instituicaoBancaria: InstituicaoBancariaModel[];
  pagamentoAtualizar: PagamentoModel = new PagamentoModel();

  @ViewChild('formaPagamentoB', {static: false}) formaPagamentoB: ElementRef;

  ngOnInit() {
    this.criarFormSearch();
    this.carregarTransportadores();
    this.obtemValor();
    this.carregarFormaPagamento();
    this.carregarIBancaria();
    // this.searchParams.pagamento.ctr = new CtrModel();
    // this.searchParams.pagamento.ctr.transportador = new TransportadorModel();
  }

  ngAfterViewInit() {
    this.formaPagamentoB.nativeElement.addEventListener('change', (event) => {
      this.pagamentoAtualizar = event.target.value;
    });
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
      dataDe: new FormControl(''),
      dataAte: new FormControl(''),
      origem: new FormControl(''),
      // transportador: new FormControl(''),
      ctr: new FormControl(''),
      dataPagamento: new FormControl(''),
    });
  }

  getSearchParams(event: any) {
    this.searchParams.formaPagamento.id = this.filterGroup.value.formaPagamento;
    this.searchParams.ativo = this.filterGroup.value.ativo;
    this.searchParams.instituicaoBancaria.id = this.filterGroup.value.instituicaoBancaria;
    this.buildDataPagamentoDeParam(this.filterGroup.value);
    this.buildDataPagamentoAteParam(this.filterGroup.value);
    return this.searchParams;
  }

  carregarTransportadores() {
    this.transportadorService.get().subscribe(transportadores => {
      this.transportadores = transportadores;
    });
  }

  carregarFormaPagamento() {
    this.formaPagamentoService.get().subscribe(formaPgto => {
      this.formasPagamento = formaPgto;
    });
  }

  carregarIBancaria() {
    this.instituicaoBancariaService.get().subscribe(iBancaria => {
      this.instituicaoBancaria = iBancaria;
    });
  }

  getFilters(event?: any): any {
    return {page: event ? event.page - 1 : 0, nomeFiler: new FormControl('')};
  }

  filtrar() {
    this.handlePageChange(0);
  }

  private buildDataPagamentoDeParam(filter: any) {
    if (filter.dataDe) {
      this.searchParams.dataPagamento = filter.dataDe;
    }
  }

  private buildDataPagamentoAteParam(filter: any) {
    if (filter.dataAte) {
      this.searchParams.dataPagamento = filter.dataAte;
    }
  }

  public convertObjToTxtParams(searchParams, pageNumber): string {
    let searchString = `sort=dataPagamento,desc&page=${pageNumber.page === undefined ? 0 : pageNumber.page - 1}&search=`;
    if (this.filterGroup.value.ativo) {
      searchString += `ativo==${this.filterGroup.value.ativo}`;
    } else if (!this.filterGroup.value.ativo) {
      searchString += `ativo!=null`;
    }
    if (this.filterGroup.value.formaPagamento) {
      searchString += `;formaPagamento.id==${this.filterGroup.value.formaPagamento}`;
    }
    if (this.filterGroup.value.instituicaoBancaria) {
      searchString += `;instituicaoBancaria.id==${this.filterGroup.value.instituicaoBancaria}`;
    }
    if (this.filterGroup.value.dataDe) {
      searchString += `;dataPagamento=ge=${this.filterGroup.value.dataDe}`;
    }
    if (this.filterGroup.value.dataAte) {
      searchString += `;dataPagamento=le=${this.filterGroup.value.dataAte}`;
    }
    if (this.filterGroup.value.ctr) {
      searchString += `;ctr.numero==*${this.filterGroup.value.ctr}*`;
    }
    if (this.filterGroup.value.origem) {
      if (this.filterGroup.value.origem === 'ctr') {
        searchString += `;ctr.id!=null`;
      } else if (this.filterGroup.value.origem === 'combo') {
        searchString += `;combo.id!=null`;
      }
    }

    // if (this.filterGroup.value.transportador) {
    //   searchString += `;ctr.transportador.id==${this.filterGroup.value.transportador}`;
    //   searchString += `,combo.transportador.id==${this.filterGroup.value.transportador}`;
    // }
    return searchString += '!';
  }

  obtemValor(params?: any) {
    this.pagamentoService.getOrderData().subscribe(
      data => {
        this.entities = data.content;
        this.count = data.totalElements;
        this.currentPage = data.number + 1;
      }, err => {
        console.log(err);
      });
  }

  updatePagamento() {
    const pagamento = new PagamentoModel();
    pagamento.id = this.pagamentoAtualizar.id;
    pagamento.formaPagamento = this.pagamentoAtualizar.formaPagamento;
    pagamento.dataPagamento = this.pagamentoAtualizar.dataPagamento;
    this.pagamentoService.update(pagamento).subscribe( data => {
      this.obtemValor();
    }, error => {
      this.notifier.notify('error', 'Falha ao atualizar pagamento\n' + error.message);
    });
  }

  informaPagamento(entity: any) {
    this.pagamentoAtualizar = entity;
  }

  gerarRelatorio() {
    window.alert('Funcionalidade não implementada, favor aguarde atualização.');
  }

  atualizarValores(event: any) {
    this.pagamentoAtualizar.formaPagamento = event;
  }
}
