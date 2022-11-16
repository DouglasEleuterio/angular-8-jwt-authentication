import {EnderecoModel} from './endereco-model';

export class TransportadorModel {
  id: string;
  nome: string;
  razaoSocial: string;
  cnpj: string;
  endereco: EnderecoModel = new EnderecoModel();
}
