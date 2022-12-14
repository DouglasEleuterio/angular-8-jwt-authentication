import {ComboModel} from "./combo-model";
import {CtrModel} from "./ctr-model";

export class DescartePorComboModel {
  id: string;
  dataDescarte: Date;
  quantidade: number;
  combo: ComboModel = new ComboModel();
  ctr: CtrModel = new CtrModel();
}
