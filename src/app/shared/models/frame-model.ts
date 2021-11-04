import { UOM } from '../enums/uom-enum';
import { BaseModel } from './base-model';

export class FrameModel extends BaseModel {
  name: string;
  uom: UOM;
  pricePerUom: number;
  frameWidthMM: number;
  cashRegisterNumber: number;
}
