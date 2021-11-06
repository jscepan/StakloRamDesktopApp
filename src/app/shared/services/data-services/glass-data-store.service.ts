import { Injectable } from '@angular/core';
import { ProductModel } from '../../models/product-model';
import { BaseDataStoreService } from '../base-data-store.service';

@Injectable()
export class GlassDataStoreService extends BaseDataStoreService<ProductModel> {
  constructor() {
    super();
  }
}
