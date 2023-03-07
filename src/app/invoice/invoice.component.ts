import {Component, Input, OnInit} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {ActivatedRoute} from '@angular/router';
import {CtrModel} from '../model/ctr-model';
import {CtrOldService} from '../_services/ctr-old.service';
import {GeradorModel} from "../model/gerador-model";


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  @Input() name: string;
  id: any;
  private sub: any;
  ctr: CtrModel;
  pagamentos: any;
  descartes: any;

  ctrService: CtrOldService;

  private readonly notifier: NotifierService;
  valorDesconto: any;

  constructor(ctrService: CtrOldService,
              notifier: NotifierService,
              private route: ActivatedRoute) {
    this.ctrService = ctrService;
    this.notifier = notifier;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id; // (+) converts string 'id' to a number
      this.ctrService.find(this.id).subscribe(
        data => {
          this.ctr = data;
          this.pagamentos = data.pagamentos;
          this.descartes = data.tipoDescartes;

          if (this.ctr.gerador === null || this.ctr.gerador === undefined) {
            const geradorNaoInformado = new GeradorModel();
            geradorNaoInformado.nome = '';
            geradorNaoInformado.retirada.logradouro = '';
            geradorNaoInformado.retirada.numero = '';
            geradorNaoInformado.retirada.complemento = '';
            geradorNaoInformado.retirada.bairro = '';
            geradorNaoInformado.retirada.cidade = '';
            geradorNaoInformado.retirada.estado = '';
            geradorNaoInformado.telefone = '';
            geradorNaoInformado.email = '';
            this.ctr.gerador = new GeradorModel();
          }

        }, error => {
          this.notifier.notify('error', error);
          console.log(error);
        }
      );
    });
  }

  total(ctr: CtrModel): any {
    return ctr.pagamentos.reduce((accumulator, obj) => {
      return accumulator + obj.valor;
    }, 0);
  }

  desconto(ctr: CtrModel): boolean {
    let result: boolean;
    const totalDescartes = this.valorTotalDescartes(ctr);
    ctr.pagamentos.forEach(element => {
      if(element.formaPagamento.nome == 'Combo') {
        result = false;
      } else if (this.total(ctr) < totalDescartes) {
        this.valorDesconto = totalDescartes - this.total(ctr);
        result = true;
      }
    });
    return result;
  }

  valorTotalDescartes(ctr: CtrModel): number {
    const totalDescartes = ctr.tipoDescartes.reduce((accumulator, obj) => {
      return accumulator + obj.valor;
    }, 0);
    return totalDescartes;
  }
}
