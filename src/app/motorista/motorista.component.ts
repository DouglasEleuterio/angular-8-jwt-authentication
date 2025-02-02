import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MotoristaModel} from '../model/motorista-model';
import {MotoristaService} from '../_services/motorista.service';
import {NotifierService} from 'angular-notifier';
import {BaseComponent} from '../commons/BaseComponent';
import {Router} from '@angular/router';

@Component({
  selector: 'app-motorista',
  templateUrl: './motorista.component.html',
  styleUrls: ['./motorista.component.css']
})
export class MotoristaComponent extends BaseComponent implements OnInit {

  motorista = new MotoristaModel();
  isEdicao = false;
  entities: MotoristaModel[];
  protected searchParams = {nome: undefined};

  constructor(private motoristaService: MotoristaService,
              notifier: NotifierService,
              private formBuilder: FormBuilder,
              private router: Router) {
    super(notifier, motoristaService);
  }

  ngOnInit() {
    this.createForm(new MotoristaModel());
    this.obtemValor();
  }

  onSubmit() {
    this.motoristaService.save(this.form.value).subscribe(
      data => {
        this.notifier.notify('success', 'Motorista ' + this.form.value.nome + ', salvo com sucesso!');
        this.createForm(new MotoristaModel());
        this.isEdicao = false;
        this.carregarMotoristas();
      }, err => {
        this.notifier.notify('error', 'Erro ao salvar motorista!');
        this.notifier.notify('warning', err.error.message);
      }
    );
  }

  carregarMotoristas() {
    this.motoristaService.get().subscribe(
      data => {
        this.entities = data.content;
      }, err => {
      }
    );
  }

  createForm(model: MotoristaModel) {
    this.form = this.formBuilder.group({
      id: new FormControl(model.id),
      nome: new FormControl(model.nome),
      cnh: new FormControl(model.cnh),
      telefone: new FormControl(model.telefone)
    });
  }

  editar(entity: MotoristaModel) {
    this.createForm(entity);
  }

  limpar() {
    this.createForm(new MotoristaModel());
  }

  carregarEntidades() {
    this.carregarMotoristas();
  }

  getService(): any {
    return this.motoristaService;
  }

  getSearchParams(event: any) {
    return this.searchParams;
  }
}
