import { UOM } from '../enums/uom-enum';
import { BaseModel } from './base-model';

export class ProductModel extends BaseModel {
  name: string;
  uom: UOM;
  pricePerUom?: number;
  cashRegisterNumber?: number;
}
