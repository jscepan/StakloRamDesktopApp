import { BaseModel } from './base-model';
import { GlassModel } from './glass-model';
import { MirrorModel } from './mirror-model';
import { PasspartuModel } from './passpartu-model';

export class ProductModel extends BaseModel {
  count: number = 1;
  outerDimension: boolean = false;
  width: number = 0;
  height: number = 0;
  glass?: GlassModel;
  passpartu?: PasspartuModel;
  mirror?: MirrorModel;
}
