import { Component, OnInit } from '@angular/core';
import {TipoDescarteService} from '../_services/tipo-descarte.service';
import { FormGroup, FormControl } from '@angular/forms';
import {TipoDescarteModel} from '../model/tipo-descarte-model';
import {Customer} from '../model/Customer';

@Component({
  selector: 'app-tipo-descarte',
  templateUrl: './tipo-descarte.component.html',
  styleUrls: ['./tipo-descarte.component.css']
})
export class TipoDescarteComponent implements OnInit {

  entities: TipoDescarteModel[];
  form: FormGroup;
  errorMessage = '';

  constructor(private tipoDescarteService: TipoDescarteService) { }

  ngOnInit() {
    this.createForm(new TipoDescarteModel());
    this.obtemValor();
  }

  createForm(model: TipoDescarteModel) {
    this.form = new FormGroup({
      nome: new FormControl(model.nome),
      valor: new FormControl(model.valor)
    });
  }

  onSubmit() {
    this.tipoDescarteService.save(this.form).subscribe(
      data => {
        this.createForm(new TipoDescarteModel());
        this.obtemValor();
      }, err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  obtemValor() {
    this.tipoDescarteService.get().subscribe(
      data => {
        this.entities = data;
      }, err => {
        this.errorMessage = err.error.message;
      });
  }
}
