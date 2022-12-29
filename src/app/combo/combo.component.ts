import {Component, Input, OnInit} from '@angular/core';
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
  transportadorSelecionado: TransportadorModel;
  transportadores: TransportadorModel[];
  descartes: TipoDescarteModel[];

  constructor(private comboService: ComboService,
              private transportadorService: TransportadorService,
              private tipoDescarteService: TipoDescarteService,
              notifier: NotifierService) {
    super(notifier);
  }

  ngOnInit() {
    this.obtemValor();
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
    this.transportadorService.get().subscribe( transportadores => {
      this.transportadores = transportadores.content;
    });
  }

  carregaTipoDescarte() {
    this.tipoDescarteService.getAtivo().subscribe( data => {
      this.descartes = data;
    });
  }

  carregarEntidades(event?: any) {
    this.params = {
      tipoDescarteId: this.filterGroup.value.tipoDescarte.id,
      transportadorId: this.filterGroup.value.transportador.id ,
      page: event ? event.page - 1 : 0
    };
    this.obtemValor(this.params);
  }

  getService(): any {
    return this.comboService;
  }
}
