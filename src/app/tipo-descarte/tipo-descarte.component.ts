import { Component, OnInit } from '@angular/core';
import {TipoDescarteService} from '../_services/tipo-descarte.service';
import { FormGroup, FormControl } from '@angular/forms';
import {TipoDescarteModel} from '../model/tipo-descarte-model';

@Component({
  selector: 'app-tipo-descarte',
  templateUrl: './tipo-descarte.component.html',
  styleUrls: ['./tipo-descarte.component.css']
})
export class TipoDescarteComponent implements OnInit {

  form: FormGroup;
  errorMessage = '';

  constructor(private tipoDescarteService: TipoDescarteService) { }

  ngOnInit() {
    this.createForm(new TipoDescarteModel());
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
        this.reloadPage();
      }, err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
