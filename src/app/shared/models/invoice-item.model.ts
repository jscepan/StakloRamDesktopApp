import { UOM } from '../enums/uom-enum';
import { BaseModel } from './base-model';
import { FrameModel } from './frame-model';
import { PasspartuColorModel } from './passpartu-color-model';
import { ProductModel } from './product-model';

export class InvoiceItemModel extends BaseModel {
  title: string;
  dimensionsWidth: number;
  dimensionsHeight: number;
  dimensionsUom: UOM;
  dimensionsOutterWidth?: number;
  dimensionsOutterHeight?: number;
  glass?: ProductModel;
  passpartuWidth?: number;
  passpartuWidthUom?: UOM;
  passpartuColor?: PasspartuColorModel;
  mirror?: ProductModel;
  faceting?: ProductModel;
  sanding?: ProductModel;
  selectedFrames?: { frame: FrameModel; colorCode?: string }[];
  amount: number = 0;
}
