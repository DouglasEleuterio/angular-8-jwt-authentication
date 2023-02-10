import {EnderecoModel} from './endereco-model';

export class GeradorModel {
  id: string;
  nome: string;
  razaoSocial: number;
  dataEmissao: number;
  cnpj: number;
  cpf: number;
  retirada: EnderecoModel = new EnderecoModel();
  telefone: string;
  email: string;
  ativo: boolean;
}
