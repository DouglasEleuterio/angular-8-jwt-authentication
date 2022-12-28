import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MotoristaModel} from '../model/motorista-model';
import {MotoristaService} from '../_services/motorista.service';
import {NotifierService} from 'angular-notifier';
import {BaseComponent} from '../commons/BaseComponent';

@Component({
  selector: 'app-motorista',
  templateUrl: './motorista.component.html',
  styleUrls: ['./motorista.component.css']
})
export class MotoristaComponent extends BaseComponent implements OnInit {

  motorista = new MotoristaModel();
  isEdicao = false;
  entities: MotoristaModel[];

  constructor(private motoristaService: MotoristaService,
              notifier: NotifierService) {
    super(notifier);
  }

  ngOnInit() {
    this.createForm(new MotoristaModel());
    this.carregarMotoristas();
  }

  onSubmit() {
    this.motoristaService.save(this.motorista).subscribe(
      data => {
        this.notifier.notify('success', 'Motorista ' + this.motorista.nome + ', salvo com sucesso!');
        this.createForm(new MotoristaModel());
        this.isEdicao = false;
        this.carregarMotoristas();
      }, err => {
        this.notifier.notify('warning', err.error.message);
        this.notifier.notify('error', 'Erro ao salvar motorista!');
      }
    );
  }

  carregarMotoristas() {
    this.motoristaService.get().subscribe(
      data => {
        this.entities = data;
      }, err => {
      }
    );
  }

  createForm(model: MotoristaModel) {
    this.form = new FormGroup({
      id: new FormControl(model.id),
      nome: new FormControl(model.nome),
      cnh: new FormControl(model.cnh),
      telefone: new FormControl(model.telefone)
    });
  }

  editar(entity: MotoristaModel) {
    window.alert('Funcionalidade ainda não implementada');
  }

  limpar() {
    window.alert('Funcionalidade ainda não implementada');
  }

  carregarEntidades() {
    this.carregarMotoristas();
  }
}
