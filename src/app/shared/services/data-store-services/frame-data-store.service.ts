import { Injectable } from '@angular/core';
import { UOM } from '../../enums/uom-enum';
import { FrameModel } from '../../models/frame-model';
import { BaseWebService } from '../base-web.service';
import { BaseDataStoreService } from './base-data-store.service';

@Injectable()
export class FrameDataStoreService extends BaseDataStoreService<FrameModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, 'frame');
    this.kreiraj();
  }

  kreiraj(): void {
    super
      .createNewEntity({
        oid: '21',
        name: 'Frame 21',
        uom: UOM.CENTIMETER,
        pricePerUom: 1000,
        frameWidthMM: 1000,
        cashRegisterNumber: 21,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '22',
        name: 'Frame 22',
        uom: UOM.CENTIMETER,
        pricePerUom: 2000,
        frameWidthMM: 2000,
        cashRegisterNumber: 22,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '23',
        name: 'Frame 23',
        uom: UOM.CENTIMETER,
        pricePerUom: 3000,
        frameWidthMM: 3000,
        cashRegisterNumber: 23,
      })
      .subscribe();
  }
}
