import { Injectable } from '@angular/core';
import { PasspartuColorModel } from '../../models/passpartu-color-model';
import { BaseDataStoreService } from '../base-data-store.service';

@Injectable()
export class PasspartuColorDataStoreService extends BaseDataStoreService<PasspartuColorModel> {
  constructor() {
    super();
  }
}
