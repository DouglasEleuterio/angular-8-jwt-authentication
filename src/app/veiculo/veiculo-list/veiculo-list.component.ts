import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../commons/BaseComponent';
import {NotifierService} from 'angular-notifier';
import {VeiculoService} from '../../_services/veiculo.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-veiculo-list',
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.css']
})
export class VeiculoListComponent extends BaseComponent {

  getSearchParams(event: any) {
        throw new Error("Method not implemented.");
    }

  constructor( notifier: NotifierService,
               veiculoService: VeiculoService) {
    super(notifier, veiculoService);
  }

  nomeTabela(): string {
    return 'Veículos';
  }

  getFilters(event?: any): any {
    return {page: event ? event.page - 1 : 0 , nomeFiler: new FormControl('')};
  }
}
