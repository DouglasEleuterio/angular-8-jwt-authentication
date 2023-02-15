import { Component, OnInit } from '@angular/core';
import {CtrModel} from '../../model/ctr-model';
import {CtrService} from '../../_services/ctr.service';
import {BaseComponent} from '../../commons/BaseComponent';
import {TransportadorModel} from '../../model/transportador-model';
import {TransportadorService} from '../../_services/transportador.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-ctr-list',
  templateUrl: './ctr-list.component.html',
  styleUrls: ['./ctr-list.component.css']
})
export class CtrListComponent extends BaseComponent implements OnInit {
  entities: CtrModel[];
  transportadores: TransportadorModel[];

  constructor(private ctrService: CtrService,
              private transportadorService: TransportadorService) {
    super();
  }

  ngOnInit() {
    this.criarFormSearch();
    this.carregarTransportadores();
    this.obtemValor();
  }

  carregarEntidades(event?: any) {
    this.params = {
      numero: this.filterGroup.value.numeroFiltro,
      dataDe: this.filterGroup.value.dataDe,
      dataAte: this.filterGroup.value.dataAte,
      transportadorId: this.filterGroup.value.transportador.id,
      page: event ? event.page - 1 : 0};
    this.obtemValor();
  }

  carregarTransportadores() {
    this.transportadorService.get().subscribe( transportadores => {
      this.transportadores = transportadores.content;
    });
  }

  criarFormSearch() {
    this.filterGroup = new FormGroup({
      numeroFiltro: new FormControl(''),
      transportador: new FormControl(''),
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


  obtemValor(params?: any) {
    this.ctrService.getWithParams().subscribe( data => {
      this.entities = data.content;
    });
  }
}
