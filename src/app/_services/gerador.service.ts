import { Injectable } from '@angular/core';
import {BaseService} from './BaseService';
import {GeradorModel} from '../model/gerador-model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const TRANSPORTADOR_RESOURCE = 'gerador';

@Injectable({
  providedIn: 'root'
})
export class GeradorService extends BaseService<GeradorModel> {

  gerador: GeradorModel;

  constructor(http: HttpClient) {
    super(http);
    this.gerador = new GeradorModel();
  }

    save(gerador): Observable<any> {
      return super.save({
        id: gerador.id,
        nome: gerador.nome,
        razaoSocial: gerador.razaoSocial,
        cnpj: gerador.cnpj,
        cpf: gerador.cpf,
        retirada: gerador.retirada,
        email: gerador.email,
        telefone: gerador.telefone
      }, TRANSPORTADOR_RESOURCE);
    }

    delete(id: string): Observable<any> {
      return super.delete(id, TRANSPORTADOR_RESOURCE);
    }

  getResource(): string {
    return TRANSPORTADOR_RESOURCE;
  }
}
