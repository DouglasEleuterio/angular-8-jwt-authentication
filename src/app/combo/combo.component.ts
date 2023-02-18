import {Component, OnInit} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {ComboService} from '../_services/combo.service';
import {ComboModel} from '../model/combo-model';
import {BaseComponent} from '../commons/BaseComponent';
import {FormControl, FormGroup} from '@angular/forms';
import {TransportadorModel} from '../model/transportador-model';
import {TransportadorService} from '../_services/transportador.service';
import {TipoDescarteModel} from '../model/tipo-descarte-model';
import {TipoDescarteService} from '../_services/tipo-descarte.service';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})
export class ComboComponent extends BaseComponent implements OnInit {

  combos: ComboModel[];
  combo: ComboModel;
  notifier: NotifierService;
  transportadores: TransportadorModel[];
  descartes: TipoDescarteModel[];

  constructor(private comboService: ComboService,
              private transportadorService: TransportadorService,
              private tipoDescarteService: TipoDescarteService,
              notifier: NotifierService) {
    super(notifier);
  }

  ngOnInit() {
    this.obtemValor('');
    this.criarFormSearch();
    this.carregarTransportadores();
    this.carregaTipoDescarte();
  }

  criarFormSearch() {
    this.filterGroup = new FormGroup({
      tipoDescarte: new FormControl(''),
      transportador: new FormControl(''),
    });
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

  carregarEntidades(event?: any) {
    let search = `size=5&page=${event - 1}&search=tipoDescarte.id!=null;transportador.id!=null`;
    if (this.filterGroup.value.tipoDescarte.id !== undefined) {
      search = search.replace('tipoDescarte.id!=null', 'tipoDescarte.id==' + this.filterGroup.value.tipoDescarte.id);
    }
    if (this.filterGroup.value.transportador.id !== undefined) {
      search = search.replace('transportador.id!=null', 'transportador.id==' + this.filterGroup.value.transportador.id);
    }
    this.getService().getWithParams(search).subscribe(data => {
      this.entities = data.content;
      this.currentPage = data.number;
    });
  }

  getService(): any {
    return this.comboService;
  }

  getFilters(event?: any): any {
    return {page: event ? event.page - 1 : 0 , nomeFiler: new FormControl('')};
  }
}
