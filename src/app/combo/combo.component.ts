import {Component, Input, OnInit} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {ComboService} from '../_services/combo.service';
import {ComboModel} from "../model/combo-model";

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})
export class ComboComponent implements OnInit {

  private comboService: ComboService;
  combo: ComboModel[];
  notifier: NotifierService;

  constructor(comboService: ComboService,
              notifier: NotifierService) {
    this.comboService = comboService;
    this.notifier = notifier;
  }

  ngOnInit() {
    this.comboService.get().subscribe(data => {
      this.combo = data;
    }, error => {
      this.notifier.notify('error', error.message);
    });
  }

  exibirHistoricioCombo(combo: ComboModel) {

  }
}
