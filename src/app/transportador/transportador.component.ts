import {Component, OnInit, ViewChild} from '@angular/core';
import {TransportadorService} from '../_services/transportador.service';
import {NotifierService} from 'angular-notifier';
import {FormControl, FormGroup} from '@angular/forms';
import {TransportadorModel} from '../model/transportador-model';
import {BaseComponent} from '../commons/BaseComponent';

@Component({
  selector: 'app-transportador',
  templateUrl: './transportador.component.html',
  styleUrls: ['./transportador.component.css']
})
export class TransportadorComponent extends BaseComponent implements OnInit {

  @ViewChild('closebutton', {static: false}) closebutton;

  entities: TransportadorModel [];
  form: FormGroup;
  isEdicao = false;
  transportador = new TransportadorModel();
  transpExcluir = new TransportadorModel();

  constructor(private transportadorService: TransportadorService,
              notifier: NotifierService) {
    super(notifier);
  }

  ngOnInit() {
    this.obtemValor();
    this.transportador = new TransportadorModel();
    this.transportador.ativo = true;
    this.createForm(new TransportadorModel());
  }

  createForm(model: TransportadorModel) {
    this.form = new FormGroup({
      id: new FormControl(model.id),
      nome: new FormControl(model.nome),
      razaoSocial: new FormControl(model.razaoSocial),
      cnpj: new FormControl(model.cnpj),
      logradouro: new FormControl(model.endereco.logradouro),
      numero: new FormControl(model.endereco.numero),
      complemento: new FormControl(model.endereco.complemento),
      bairro: new FormControl(model.endereco.bairro),
      cidade: new FormControl(model.endereco.cidade),
      estado: new FormControl(model.endereco.estado),
      cep: new FormControl(model.endereco.cep),
      observacao: new FormControl(model.endereco.observacao),
      email: new FormControl(model.email),
      telefone: new FormControl(model.telefone),
    });
  }

  onSubmit() {
    this.criarEndereco();
    this.transportadorService.save(this.transportador).subscribe(
      data => {
        this.createForm(new TransportadorModel());
        this.isEdicao = false;
        this.notifier.notify('success', 'Transportadora: ' + data.razaoSocial + ' criada!');
      }, err => {
        this.notifier.notify('error', err.error.message );
      }
    );
    this.obtemValor();
  }

  criarEndereco() {
    this.transportadorService.endereco.logradouro = this.form.value.logradouro;
    this.transportadorService.endereco.numero = this.form.value.numero;
    this.transportadorService.endereco.complemento = this.form.value.complemento;
    this.transportadorService.endereco.bairro = this.form.value.bairro;
    this.transportadorService.endereco.cidade = this.form.value.cidade;
    this.transportadorService.endereco.estado = this.form.value.estado;
    this.transportadorService.endereco.cep = this.form.value.cep;
    this.transportadorService.endereco.observacao = this.form.value.observacao;
  }

  editar(entity: TransportadorModel): void {
    this.isEdicao = true;
    this.transportador.id = entity.id;
    this.transportador = entity;
  }

  manipular(entity: TransportadorModel) {
    this.transportador = entity;
  }

  excluir() {
    this.transportadorService.delete(this.transpExcluir.id).subscribe(
      data => {
        this.closebutton.nativeElement.click();
        this.notifier.notify('success', 'Transportadora: ' + this.transportador.nome + ' deletada' );
        this.obtemValor();
    }, err => {});
  }

  limpar() {
    this.isEdicao = false;
    this.transportador = new TransportadorModel();
  }

  prepararExclusao(entity: TransportadorModel) {
    this.transpExcluir = entity;
  }

  carregarEntidades() {
    this.obtemValor();
  }

  getService(): any {
    return this.transportadorService;
  }
}
