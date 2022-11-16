import {EnderecoModel} from './endereco-model';

export class DestinatarioModel {
  id: string;
  nome: string;
  razaoSocial: string;
  dataRecebimento: Date;
  cnpj: string;
  enderecoRecebimento: EnderecoModel;
}
