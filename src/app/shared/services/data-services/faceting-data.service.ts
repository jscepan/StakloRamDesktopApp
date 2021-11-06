import { Injectable } from '@angular/core';
import { FacetingModel } from '../../models/faceting-model';
import { BaseDataService } from '../base-data.service';

@Injectable()
export class FacetingDataService extends BaseDataService<FacetingModel> {
  constructor() {
    super();
  }
}
