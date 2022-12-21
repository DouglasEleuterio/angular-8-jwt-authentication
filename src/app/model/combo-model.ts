import {TipoDescarteModel} from './tipo-descarte-model';
import {TransportadorModel} from './transportador-model';

export class ComboModel {
  id: string;
  tipoDescarte: TipoDescarteModel = new TipoDescarteModel();
  transportador: TransportadorModel = new TransportadorModel();
  saldo = 0;
}
