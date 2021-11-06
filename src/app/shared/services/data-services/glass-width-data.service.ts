import { Injectable } from '@angular/core';
import { GlassWidthModel } from '../../models/glass-width-model';
import { BaseDataService } from '../base-data.service';

@Injectable()
export class GlassWidthDataService extends BaseDataService<GlassWidthModel> {
  constructor() {
    super();
  }
}
