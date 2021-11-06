import { Injectable } from '@angular/core';
import { GlassModel } from '../../models/glass-model';
import { BaseDataService } from '../base-data.service';

@Injectable()
export class GlassDataService extends BaseDataService<GlassModel> {
  constructor() {
    super();
  }
}
