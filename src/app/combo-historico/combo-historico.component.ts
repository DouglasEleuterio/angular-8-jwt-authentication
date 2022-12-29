import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AquisicaoModel} from '../model/aquisicao-model';
import {AquisicaoService} from '../_services/aquisicao.service';
import {DescartePorComboModel} from '../model/descarte-por-combo-model';
import {DescartePorComboService} from '../_services/descarte-por-combo.service';

@Component({
  selector: 'app-combo-historico',
  templateUrl: './combo-historico.component.html',
  styleUrls: ['./combo-historico.component.css']
})
export class ComboHistoricoComponent implements OnInit {

  comboId: any;
  aquisicao: AquisicaoModel = new AquisicaoModel();
  valorPago = 1800.00;
  aquisicaoService: AquisicaoService;
  descartePorCombo: DescartePorComboModel[];
  descatePorComboService: DescartePorComboService;

  constructor(private route: ActivatedRoute,
              aquisicaoService: AquisicaoService,
              descartePorComboService: DescartePorComboService) {
    this.aquisicaoService = aquisicaoService;
    this.descatePorComboService = descartePorComboService;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.comboId = +params.comboId;
    });

    this.aquisicaoService
      .getSpecifiedPathWithId(this.comboId).subscribe(
      data => {
        this.aquisicao = data.content;
      }, error => {
      });

    this.descatePorComboService.find(this.comboId).subscribe(
      data => {
        this.descartePorCombo = data.content;
      }, error => {
        console.log(error);
      });
  }
}
