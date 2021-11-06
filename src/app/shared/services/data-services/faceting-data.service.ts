import { Injectable } from '@angular/core';
import { ProductModel } from '../../models/product-model';
import { BaseDataService } from '../base-data.service';

@Injectable()
export class FacetingDataService extends BaseDataService<ProductModel> {
  constructor() {
    super();
  }
}
