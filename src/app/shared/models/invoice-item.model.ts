import { UOM } from '../enums/uom-enum';
import { BaseModel } from './base-model';
import { FrameModel } from './frame-model';
import { PasspartuColorModel } from './passpartu-color-model';
import { ProductModel } from './product-model';

export class InvoiceItemModel extends BaseModel {
  count: number;
  itemTitle: string;
  dimensions: {
    width: number;
    height: number;
    uom: UOM;
    outterWidth?: number;
    outterHeight?: number;
  };
  glass?: ProductModel;
  passpartu?: { value?: PasspartuColorModel; width?: number; widthUom?: UOM };
  mirror?: ProductModel;
  faceting?: ProductModel;
  sanding?: ProductModel;
  selectedFrames?: { frame: FrameModel; colorCode?: string }[];
  amount: number = 0;
}
