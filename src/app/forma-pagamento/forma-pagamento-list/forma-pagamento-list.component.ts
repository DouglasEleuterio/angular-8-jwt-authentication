import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../commons/BaseComponent';
import {NotifierService} from 'angular-notifier';
import {FormaPagamentoService} from '../../_services/forma-pagamento.service';

@Component({
  selector: 'app-forma-pagamento-list',
  templateUrl: './forma-pagamento-list.component.html',
  styleUrls: ['./forma-pagamento-list.component.css']
})
export class FormaPagamentoListComponent  extends BaseComponent {

  constructor( notifier: NotifierService,
               pagamentoService: FormaPagamentoService) {
    super(notifier, pagamentoService);
  }

  nomeTabela(): string {
    return 'Fomas de Pagamento';
  }

  getFilters(event?: any): any {
    return {page: event ? event.page - 1 : 0};
  }

  getSearchParams(event: any) {
    throw new Error('Method not implemented.');
  }
}
