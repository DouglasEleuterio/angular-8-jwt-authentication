import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';
import {TransportadorModel} from '../model/transportador-model';
import {VeiculoService} from '../_services/veiculo.service';
import {VeiculoModel} from '../model/veiculo-model';
import {NotifierService} from 'angular-notifier';
import {TransportadorService} from '../_services/transportador.service';
import {VeiculoParams} from "../model/params/veiculo-params";

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit {

  @ViewChild('closebutton', {static: false}) closebutton;

  transportadorService: TransportadorService;

  form: FormGroup;
  veiculo = new  VeiculoModel();
  private readonly notifier: NotifierService;
  transportadores: TransportadorModel[];
  transportador = new TransportadorModel();
  isEdicao: boolean;
  transportadorSelecionado: TransportadorModel;
  entities: VeiculoModel[];
  veiculoExcluir = new VeiculoModel();
  placa: any;
  modelo: any;
  page: any;

  constructor(private veiculoService: VeiculoService, notifier: NotifierService, transportadorService: TransportadorService) {
    this.notifier = notifier;
    this.createForm(new VeiculoModel());
    this.transportadorService = transportadorService;
  }

  ngOnInit() {
    this.veiculo = new VeiculoModel();
    this.transportador = new TransportadorModel();
    this.createForm(new VeiculoModel());
    this.carregarTransportadores();
    this.carregarVeiculos();
  }

  carregarVeiculos() {
    const veiculoParams = new VeiculoParams();
    if (this.placa) {
      veiculoParams.placa = this.placa;
    }
    if (this.modelo) {
      veiculoParams.modelo = this.modelo;
    }
    if (this.page) {
      veiculoParams.page = this.page;
    }
    this.veiculoService.get().subscribe(
      data => {
        this.entities = data.content;
      }, error => {}
    );
  }

  onSubmit() {
    this.veiculo.transportador = this.transportadorSelecionado;
    this.veiculoService.save(this.veiculo).subscribe(
      data => {
        this.notifier.notify('success', 'Veículo: ' + data.modelo + ' cadastrado!');
        window.location.reload();
      }, err => {
        this.notifier.notify('error', err.error.message );
      }
    );
  }

  createForm(model: VeiculoModel) {
    model.transportador = new TransportadorModel();
    this.form = new FormGroup({
      marca: new FormControl(model.marca),
      modelo: new FormControl(model.modelo),
      placa: new FormControl(model.placa),
      transportador: new FormControl(model.transportador)
    });
  }

  limpar() {
    this.isEdicao = false;
    this.veiculo = new VeiculoModel();
    this.transportadorSelecionado = new TransportadorModel();
  }

  carregarTransportadores() {
    this.transportadorService.get().subscribe( transportadores => {
      this.transportadores = transportadores;
    });
  }

  selecionarTransportador(transportador: TransportadorModel) {
    console.log(transportador);
  }

  editar(entity: VeiculoModel): void {
    this.isEdicao = true;
    this.veiculo = entity;
    this.transportadorSelecionado = entity.transportador;
  }

  prepararExclusao(entity: VeiculoModel) {
    this.veiculoExcluir = entity;
  }

  excluir() {
    this.veiculoService.delete(this.veiculoExcluir.id).subscribe(
      data => {
        this.closebutton.nativeElement.click();
        this.notifier.notify('success', 'Transportadora: ' + this.transportador.nome + ' deletada' );
        window.location.reload();
      }, err => {});
  }

}
