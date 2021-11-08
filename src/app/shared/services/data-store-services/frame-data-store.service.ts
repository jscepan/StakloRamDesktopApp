import { Injectable } from '@angular/core';
import { FrameModel } from '../../models/frame-model';
import { BaseWebService } from '../base-web.service';
import { BaseDataStoreService } from './base-data-store.service';

@Injectable()
export class FrameDataStoreService extends BaseDataStoreService<FrameModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, 'frame');
  }
}