import { Injectable } from '@angular/core';
import { PasspartuModel } from '../../models/passpartu-model';
import { BaseDataService } from '../base-data.service';

@Injectable()
export class PasspartuDataService extends BaseDataService<PasspartuModel> {
  constructor() {
    super();
  }
}
