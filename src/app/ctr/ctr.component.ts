import { Component, OnInit } from '@angular/core';
import {VeiculoModel} from '../model/veiculo-model';
import {VeiculoService} from '../_services/veiculo.service';
import {TransportadorModel} from '../model/transportador-model';
import {TransportadorService} from '../_services/transportador.service';
import {DestinatarioModel} from '../model/destinatario-model';
import {GeradorModel} from '../model/gerador-model';
import {GeradorService} from '../_services/gerador.service';
import {DestinatarioService} from '../_services/destinatario.service';

@Component({
  selector: 'app-ctr',
  templateUrl: './ctr.component.html',
  styleUrls: ['./ctr.component.css']
})
export class CtrComponent implements OnInit {

  veiculoService: VeiculoService;
  transportadorService: TransportadorService;
  geradorService: GeradorService;
  destinatarioService: DestinatarioService;

  veiculos: VeiculoModel[];
  veiculoSelecionado: VeiculoModel;

  transportadores: TransportadorModel[];
  transportadorSelecionado: TransportadorModel;

  geradores: GeradorModel[];
  geradorSelecionado: GeradorModel;

  destinatarios: DestinatarioModel[];
  destinatarioSelecionado: DestinatarioModel;

  constructor(veiculoService: VeiculoService,
              transportadorService: TransportadorService,
              geradorService: GeradorService,
              destinatarioService: DestinatarioService
  ) {
    this.veiculoService = veiculoService;
    this.transportadorService = transportadorService;
    this.geradorService = geradorService;
    this.destinatarioService = destinatarioService;
  }

  ngOnInit() {
    this.carregarVeiculos();
    this.carregarTransportadores();
    this.carregarGerador();
    this.carregarDestinatario();
  }

  carregarVeiculos() {
    this.veiculoService.get().subscribe(data => {
        this.veiculos = data;
    });
  }

  carregarTransportadores() {
    this.transportadorService.get().subscribe( transportadores => {
      this.transportadores = transportadores;
    });
  }

  carregarGerador() {
    this.geradorService.get().subscribe( data => {
      this.geradores = data;
    });
  }

  carregarDestinatario() {
    this.destinatarioService.get().subscribe( data => {
      this.destinatarios = data;
    });
  }
}
