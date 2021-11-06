import { Injectable } from '@angular/core';
import { ProductModel } from '../../models/product-model';
import { BaseWebService } from '../base-web.service';
import { BaseDataStoreService } from './base-data-store.service';

@Injectable()
export class GlassDataStoreService extends BaseDataStoreService<ProductModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, 'glass');
  }
}
