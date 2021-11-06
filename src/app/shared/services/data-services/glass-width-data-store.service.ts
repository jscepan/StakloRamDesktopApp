import { Injectable } from '@angular/core';
import { ProductModel } from '../../models/product-model';
import { BaseDataStoreService } from '../base-data-store.service';

@Injectable()
export class GlassWidthDataStoreService extends BaseDataStoreService<ProductModel> {
  constructor() {
    super();
  }
}
