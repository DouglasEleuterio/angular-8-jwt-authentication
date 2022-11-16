import { Component, OnInit } from '@angular/core';
import {FormaPagamentoService} from '../_services/forma-pagamento.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  private readonly notifier: NotifierService;

  constructor(private formaPagamentoService: FormaPagamentoService,
              notifier: NotifierService) {
    this.notifier = notifier;
  }

  ngOnInit() {
  }

}
