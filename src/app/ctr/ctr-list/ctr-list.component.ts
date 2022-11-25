import { Component, OnInit } from '@angular/core';
import {CtrModel} from '../../model/ctr-model';
import {CtrService} from '../../_services/ctr.service';

@Component({
  selector: 'app-ctr-list',
  templateUrl: './ctr-list.component.html',
  styleUrls: ['./ctr-list.component.css']
})
export class CtrListComponent implements OnInit {
  entities: CtrModel[];

  constructor(private ctrService: CtrService) { }

  ngOnInit() {
    this.ctrService.get().subscribe( data => {
      this.entities = data;
    }, error => {
      console.log(error);
    });
  }

  valorTotal(entity: CtrModel) {
    let total = 0;
    entity.pagamentos.forEach(pagamento => {
      total += pagamento.valor;
    });
    return total;
  }
}
