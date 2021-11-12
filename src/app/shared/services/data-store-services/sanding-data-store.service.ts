import { Injectable } from '@angular/core';
import { UOM } from '../../enums/uom-enum';
import { ProductModel } from '../../models/product-model';
import { BaseWebService } from '../base-web.service';
import { BaseDataStoreService } from './base-data-store.service';

@Injectable()
export class SandingDataStoreService extends BaseDataStoreService<ProductModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, 'sanding');
    this.kreiraj();
  }

  kreiraj(): void {
    super
      .createNewEntity({
        oid: '01',
        name: 'PESKARENJE SA MOTIVOM',
        uom: UOM.METER2,
        pricePerUom: 2400,
        cashRegisterNumber: 124,
      })
      .subscribe();
  }
}
