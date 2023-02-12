import {TransportadorModel} from './transportador-model';

export class VeiculoModel {
  id: string;
  marca: string;
  modelo: string;
  placa: string;
  transportador: TransportadorModel;
  ativo: boolean;
}
