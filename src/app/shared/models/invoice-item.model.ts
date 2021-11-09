import { UOM } from '../enums/uom-enum';
import { BaseModel } from './base-model';
import { FrameModel } from './frame-model';
import { ProductModel } from './product-model';

export class InvoiceItemModel extends BaseModel {
  count: number;
  dimensions: {
    width: number;
    height: number;
    uom: UOM;
  };
  glass?: ProductModel;
  passpartu?: { value?: ProductModel; width?: number; uom?: UOM };
  mirror?: ProductModel;
  selectedFrames?: FrameModel[];
}
