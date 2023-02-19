import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../commons/BaseComponent';
import {NotifierService} from 'angular-notifier';
import {MotoristaService} from '../../_services/motorista.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-motorista-list',
  templateUrl: './motorista-list.component.html',
  styleUrls: ['./motorista-list.component.css']
})
export class MotoristaListComponent extends BaseComponent {

  constructor( notifier: NotifierService,
               motoristaService: MotoristaService) {
    super(notifier, motoristaService);
  }

  nomeTabela(): string {
    return 'Motoristas';
  }

  getFilters(event?: any): any {
    return {page: event ? event.page - 1 : 0 , nomeFiler: new FormControl('')};
  }

  getSearchParams(event: any) {
    throw new Error('Method not implemented.');
  }
}
