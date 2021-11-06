import { Injectable } from '@angular/core';
import { FrameModel } from '../../models/frame-model';
import { BaseDataService } from '../base-data.service';

@Injectable()
export class FrameDataService extends BaseDataService<FrameModel> {
  constructor() {
    super();
    // super.$entities.next([
    //   {
    //     oid: 'oid',
    //     name: 'name',
    //     uom: UOM.CENTIMETER,
    //     pricePerUom: 99999,
    //     frameWidthMM: 88888,
    //     cashRegisterNumber: 77777,
    //   },
    //   {
    //     oid: 'oid45',
    //     name: 'name',
    //     uom: UOM.CENTIMETER,
    //     pricePerUom: 99999,
    //     frameWidthMM: 88888,
    //     cashRegisterNumber: 77777,
    //   },
    // ]);
  }
}
