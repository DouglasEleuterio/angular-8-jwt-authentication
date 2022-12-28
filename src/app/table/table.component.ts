import {Component, OnInit} from '@angular/core';
import {VeiculoService} from '../_services/veiculo.service';

@Component({
  selector: 'app-table',
  styleUrls: ['./table.component.css'],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  entities: any;
  currentTutorial = null;
  currentIndex = -1;
  placa = '';
  modelo = '';
  title = '';

  page = 1;
  count = 3;
  pageSize = 5;

  ngOnInit(): void {
    //Carga inicial
    this.retrieveTutorials();
  }

  constructor(private veiculoService: VeiculoService) {
  }

  getRequestParams(searchTitle, page, pageSize) {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveTutorials() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    this.veiculoService.get()
      .subscribe(
        response => {
          this.entities = response;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event) {
    this.page = event;
    this.retrieveTutorials();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTutorials();
  }

  setActiveTutorial(tutorial: any, i: number) {
    this.currentTutorial = tutorial;
    this.currentIndex = i;
    console.log(this.currentTutorial.modelo);
  }
}
