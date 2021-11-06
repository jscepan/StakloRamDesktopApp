import { Injectable } from '@angular/core';
import { PasspartuColorModel } from '../../models/passpartu-color-model';
import { BaseDataService } from '../base-data.service';

@Injectable()
export class PasspartuColorDataService extends BaseDataService<PasspartuColorModel> {
  constructor() {
    super();
  }
}
