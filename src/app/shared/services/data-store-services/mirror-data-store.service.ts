import { Injectable } from '@angular/core';
import { UOM } from '../../enums/uom-enum';
import { ProductModel } from '../../models/product-model';
import { BaseWebService } from '../base-web.service';
import { BaseDataStoreService } from './base-data-store.service';

@Injectable()
export class MirrorDataStoreService extends BaseDataStoreService<ProductModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, 'mirror');

    this.kreiraj();
  }

  kreiraj(): void {
    super
      .createNewEntity({
        oid: '1',
        name: 'OGLEDALO 3 mm',
        uom: UOM.METER2,
        pricePerUom: 2592,
        cashRegisterNumber: 52,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '2',
        name: 'OGLEDALO 4 mm',
        uom: UOM.METER2,
        pricePerUom: 3240,
        cashRegisterNumber: 53,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '3',
        name: 'KUPČEVO',
        uom: UOM.METER2,
        pricePerUom: 0,
      })
      .subscribe();
  }
}
