import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {DashboardService} from '../_services/dashboard.service';

@Component({
  selector: 'app-painel-financeiro',
  templateUrl: './painel-financeiro.component.html',
  styleUrls: ['./painel-financeiro.component.css']
})
export class PainelFinanceiroComponent implements OnInit {

  public chart: any;
  public entradasMes: any;
  ticksStyle: any;
  mode: any;
  intersect: any;
  retorno: any;
  anoAtual: any;
  anoAnterior: any;
  valoresAnoAtual: number[] = [];
  valoresAnoAnterior: number[] = [];

  constructor(private dashBoardService: DashboardService) {
    this.retorno = -0.1059;
  }

  ngOnInit() {
    this.ticksStyle = {
      fontColor: '#495057',
      fontStyle: 'bold'
    };
    this.mode = 'index';
    this.intersect = true;
    this.createChart();
    this.carregaValorDescartesMensal();
  }

  createChart() {

    this.chart = new Chart('MyChart', {
      type: 'bar',

      data: {// values on X-Axis
        labels: ['JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [
          {
            backgroundColor: '#007bff',
            borderColor: '#007bff',
            data: [1000, 2000, 3000, 2500, 2700, 2500, 3000]
          },
          {
            backgroundColor: '#ced4da',
            borderColor: '#ced4da',
            data: [700, 1700, 2700, 2000, 1800, 1500, 2000]
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
}
