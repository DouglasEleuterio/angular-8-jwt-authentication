import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {DashboardService} from '../_services/dashboard.service';
import * as $ from 'jquery';
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-painel-financeiro',
  templateUrl: './painel-financeiro.component.html',
  styleUrls: ['./painel-financeiro.component.css']
})
export class PainelFinanceiroComponent implements OnInit {

  public chart: any;
  public semanal: any;
  public entradasMes: any;
  ticksStyle: any;
  mode: any;
  intersect: any;
  retorno: any;
  anoAtual: any;
  anoAnterior: any;
  valoresAnoAtual: number[] = [];
  valoresAnoAnterior: number[] = [];
  valoresSemanaAtual: number [] = [];
  valoresSemanaAnterior: number [] = [];
  pagamentos: {nome: string, valor: number}[] = [];
  totalPagamentos: any;
  transportadores: {nome: string, valor: number}[] = [];

  constructor(private dashBoardService: DashboardService,
              private tokenStorageService: TokenStorageService) {
    this.retorno = -0.1059;
  }

  ngOnInit() {
    this.ticksStyle = {
      fontColor: '#495057',
      fontStyle: 'bold'
    };
    this.mode = 'index';
    this.intersect = true;
    this.carregaValorDescartesMensal();
    this.carregaValorDescartesSemanal();
    this.carregaPagamentosAgrupados();
    this.carregaPagamentosTransportador();
  }

  createChart() {

    this.chart = new Chart('MyChart', {
      type: 'bar',

      data: {// values on X-Axis
        labels: ['SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO'],
        datasets: [
          {
            backgroundColor: '#007bff',
            borderColor: '#007bff',
            data: this.valoresSemanaAtual,
          },
          {
            backgroundColor: '#ced4da',
            borderColor: '#ced4da',
            data: this.valoresSemanaAnterior,
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          mode: this.mode,
          intersect: this.intersect
        },
        hover: {
          mode: this.mode,
          intersect: this.intersect
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            // display: false,
            gridLines: {
              display: true,
              lineWidth: '4px',
              color: 'rgba(0, 0, 0, .2)',
              zeroLineColor: 'transparent'
            },
            ticks: $.extend({
              beginAtZero: true,
            }, this.ticksStyle)
          }],
          xAxes: [{
            display: true,
            gridLines: {
              display: false
            },
            ticks: this.ticksStyle
          }]
        }
      }
    });
  }

  createChartEntrada() {
    this.entradasMes = new Chart('ChartMensal', {
      type: 'line',
      data: {
        labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
        datasets: [{
          label: this.anoAtual,
          data: this.valoresAnoAtual,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          pointBorderColor: '#007bff',
          pointBackgroundColor: '#007bff',
          fill: false
          // pointHoverBackgroundColor: '#007bff',
          // pointHoverBorderColor    : '#007bff'
        },
          {
            label: this.anoAnterior,
            data: this.valoresAnoAnterior,
            backgroundColor: 'tansparent',
            borderColor: '#ced4da',
            pointBorderColor: '#ced4da',
            pointBackgroundColor: '#ced4da',
            fill: false
            // pointHoverBackgroundColor: '#ced4da',
            // pointHoverBorderColor    : '#ced4da'
          }]
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          mode: this.mode,
          intersect: this.intersect
        },
        hover: {
          mode: this.mode,
          intersect: this.intersect
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            // display: false,
            gridLines: {
              display: true,
              lineWidth: '4px',
              color: 'rgba(0, 0, 0, .2)',
              zeroLineColor: 'transparent'
            },
            ticks: $.extend({
              beginAtZero: true,
              suggestedMax: 200
            }, this.ticksStyle)
          }],
          xAxes: [{
            display: true,
            gridLines: {
              display: false
            },
            ticks: this.ticksStyle
          }]
        }
      }
    });
  }

  private carregaValorDescartesMensal() {
    this.dashBoardService.getAcumuladoMensal().subscribe(
      value => {
        this.anoAtual = value.anoAtual;
        this.anoAnterior = value.anoAnterior;
        this.valoresAnoAtual = value.dataAnoAtual;
        this.valoresAnoAnterior = value.dataAnoAnterior;
        this.createChartEntrada();
      }, error => {
      }
    );
  }

  private carregaValorDescartesSemanal() {
    this.dashBoardService.getAcumuladoSemanal().subscribe(
      value => {
        this.valoresSemanaAtual = value.semanaAtual;
        this.valoresSemanaAnterior = value.semanaPassada;
        this.createChart();
      }, error => {
      }
    );
  }

  private carregaPagamentosAgrupados() {
    this.dashBoardService.getPagamentoAgrupado().subscribe(
      value => {
        console.log(value);
        this.pagamentos = value;
        this.totalPagamentos = this.calcularTotalPagamentos();
        this.createChart();
      }, error => {
        console.log(error);
      }
    );
  }

  private carregaPagamentosTransportador() {
    this.dashBoardService.getPagamentoTransportador().subscribe(
      value => {
        console.log(value);
        this.transportadores = value;
        this.createChart();
      }, error => {
        console.log(error);
      }
    );
  }

  acumuladoSemanaAtual() {
    let total = 0;
    this.valoresSemanaAtual.forEach(value => {
      total += value;
    });
    return total;
  }

  retornoSemana() {
    return (this.acumuladoSemanaAtual() / this.acumuladoSemanaAnterior()) - 1;
  }

  public acumuladoSemanaAnterior() {
    let total = 0;
    this.valoresSemanaAnterior.forEach(value => {
      total += value;
    });
    return total;
  }

  private calcularTotalPagamentos() {
    let total = 0;
    this.pagamentos.forEach(value => {
      total += value.valor;
    });
    return total;
  }
}
