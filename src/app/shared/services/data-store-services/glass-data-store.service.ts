import { Injectable } from '@angular/core';
import { UOM } from '../../enums/uom-enum';
import { ProductModel } from '../../models/product-model';
import { BaseWebService } from '../base-web.service';
import { BaseDataStoreService } from './base-data-store.service';

@Injectable()
export class GlassDataStoreService extends BaseDataStoreService<ProductModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, 'glass');
    this.kreiraj();
  }

  kreiraj(): void {
    super
      .createNewEntity({
        oid: '1',
        name: 'STAKLO 2 mm',
        uom: UOM.METER2,
        pricePerUom: 1320,
        cashRegisterNumber: 40,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '2',
        name: 'ANTIREFLEKS',
        uom: UOM.METER2,
        pricePerUom: 3024,
        cashRegisterNumber: 39,
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
