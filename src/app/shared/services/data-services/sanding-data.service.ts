import { Injectable } from '@angular/core';
import { ProductModel } from '../../models/product-model';
import { BaseDataService } from '../base-data.service';

@Injectable()
export class SandingDataService extends BaseDataService<ProductModel> {
  constructor() {
    super();
  }
}
