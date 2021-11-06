import { Injectable } from '@angular/core';
import { SandingModel } from '../../models/sanding-model';
import { BaseDataService } from '../base-data.service';

@Injectable()
export class SandingDataService extends BaseDataService<SandingModel> {
  constructor() {
    super();
  }
}
