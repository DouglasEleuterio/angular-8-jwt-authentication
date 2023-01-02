import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {BaseComponent} from '../../commons/BaseComponent';
import {NotifierService} from 'angular-notifier';
import {TipoDescarteService} from '../../_services/tipo-descarte.service';

@Component({
  selector: 'app-tipo-descarte-list',
  templateUrl: './tipo-descarte-list.component.html',
  styleUrls: ['./tipo-descarte-list.component.css']
})
export class TipoDescarteListComponent extends BaseComponent {

  constructor( notifier: NotifierService,
               tipoDescarteService: TipoDescarteService) {
    super(notifier, tipoDescarteService);
  }

  nomeTabela(): string {
    return 'Veículos';
  }

  getFilters(event?: any): any {
    return {page: event ? event.page - 1 : 0 , nomeFiler: new FormControl('')};
  }

}
