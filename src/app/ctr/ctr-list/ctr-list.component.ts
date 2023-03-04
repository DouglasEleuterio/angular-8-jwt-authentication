import {Component, OnInit} from '@angular/core';
import {CtrModel} from '../../model/ctr-model';
import {BaseComponent} from '../../commons/BaseComponent';
import {TransportadorModel} from '../../model/transportador-model';
import {TransportadorService} from '../../_services/transportador.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CtrOldService} from '../../_services/ctr-old.service';
import {CtrService} from '../../_services/ctr.service';

@Component({
  selector: 'app-ctr-list',
  templateUrl: './ctr-list.component.html',
  styleUrls: ['./ctr-list.component.css']
})
export class CtrListComponent extends BaseComponent implements OnInit {

  entities: CtrModel[];
  transportadores: TransportadorModel[];
  protected searchParams = {numero: '', geracao: '', dataDe: '', dataAte: '', transportadoraId: ''};

  constructor(private ctrService: CtrService,
              private transportadorService: TransportadorService,
              private fb: FormBuilder
              ) {
    super(null, ctrService);
  }


  ngOnInit() {
    this.criarFormSearch();
    this.carregarTransportadores();
    this.obtemValor();
  }

  carregarEntidades(event?: any) {
    super.handlePageChange(0);
  }

  carregarTransportadores() {
    this.transportadorService.get().subscribe( transportadores => {
      this.transportadores = transportadores;
    });
  }

  criarFormSearch() {
    this.filterGroup = this.fb.group({
      numero: new FormControl(''),
      transportadoraId: new FormControl(''),
      dataDe: new FormControl(''),
      dataAte: new FormControl(''),
    });
  }

  getService(): any {
    return this.ctrService;
  }

  valorTotal(entity: CtrModel) {
    let total = 0;
    entity.pagamentos.forEach(pagamento => {
      total += pagamento.valor;
    });
    return total;
  }

  limpar() {
    this.criarFormSearch();
    this.obtemValor();
  }

  getSearchParams(event: any) {
    this.searchParams = this.filterGroup.value;
    return this.searchParams;
  }

  handlePageChange(event): void {
    const paramsObj = this.getSearchParams(event);
    let paramsTxt = this.convertObjToTxtParams(paramsObj, event);
    paramsTxt = paramsTxt.substring(0, paramsTxt.length - 1);
    this.service.getWithParams(paramsTxt).subscribe(data2 => {
      this.entities = data2.content;
      this.count = data2.totalElements;
      this.currentPage = data2.number + 1;
    });
  }

  public convertObjToTxtParams(searchParams, pageNumber): string {
    let searchString = `page=${pageNumber.page === undefined ? 0 : pageNumber.page - 1}&`;
    let countParam = 0;
    for (const [key, value] of Object.entries(searchParams)) {
      countParam++;
      if (value !== undefined && value !== null && value !== '' && key !== 'transportadoraId') {
        searchString += `${key}=${value}&`;
      }
      if (key === 'transportadoraId' && key !== null && key !== undefined && value !== '') {
        const transportador = searchParams.transportadoraId;
        searchString += `${key}=${transportador.id}&`;
      }
    }
    return searchString;
  }
}
