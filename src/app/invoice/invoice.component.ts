import {Component, Input, OnInit} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {ActivatedRoute} from '@angular/router';
import {CtrModel} from '../model/ctr-model';
import {CtrOldService} from '../_services/ctr-old.service';


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
        }, error => {
          this.notifier.notify('error', error);
          console.log(error);
        }
      );
      // In a real app: dispatch action to load the details here.
    });
  }

  total(ctr: CtrModel): any {
    return ctr.pagamentos.reduce((accumulator, obj) => {
      return accumulator + obj.valor;
    }, 0);
  }

  desconto(ctr: CtrModel): boolean {
    const totalDescartes = this.valorTotalDescartes(ctr);
    if (this.total(ctr) < totalDescartes) {
        this.valorDesconto = totalDescartes - this.total(ctr);
        return true;
    }
  }

  valorTotalDescartes(ctr: CtrModel): number {
    const totalDescartes = ctr.tipoDescartes.reduce((accumulator, obj) => {
      return accumulator + obj.valor;
    }, 0);
    return totalDescartes;
  }
}
