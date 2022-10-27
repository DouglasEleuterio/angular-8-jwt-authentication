import { Component, OnInit } from '@angular/core';
import {FormaPagamentoService} from "../_services/forma-pagamento.service";
import {FormControl, FormGroup} from "@angular/forms";
import {FormaPagamentoModel} from "../model/FormaPagamentoModel";
import {TipoDescarteModel} from "../model/tipo-descarte-model";
import {any} from "codelyzer/util/function";

@Component({
  selector: 'app-forma-pagamento',
  templateUrl: './forma-pagamento.component.html',
  styleUrls: ['./forma-pagamento.component.css']
})
export class FormaPagamentoComponent implements OnInit {

  entities: FormaPagamentoModel[];
  form: FormGroup;
  errorMessage = '';

  constructor(private formaPagamentoService: FormaPagamentoService) { }

  ngOnInit() {
    this.createForm(new FormaPagamentoModel());
    this.obtemValor();
  }

  createForm(model: FormaPagamentoModel) {
    this.form = new FormGroup({
      nome: new FormControl(model.nome),
      status: new FormControl(model.status)
    });
  }

  obtemValor() {
    this.formaPagamentoService.get().subscribe(
      data => {
        this.entities = data;
      }, err => {
        this.errorMessage = err.error.message;
      });
  }

  onSubmit() {
    this.formaPagamentoService.save(this.form).subscribe(
      data => {
        this.createForm(new FormaPagamentoModel());
        this.obtemValor();
      }, err => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
