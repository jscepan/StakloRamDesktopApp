import { Injectable } from '@angular/core';
import { UOM } from '../../enums/uom-enum';
import { ProductModel } from '../../models/product-model';
import { BaseWebService } from '../base-web.service';
import { BaseDataStoreService } from './base-data-store.service';

@Injectable()
export class PasspartuDataStoreService extends BaseDataStoreService<ProductModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, 'passpartu');
    this.kreiraj();
  }

  kreiraj(): void {
    super
      .createNewEntity({
        oid: '1',
        name: 'Paspartu',
        uom: UOM.METER2,
        pricePerUom: 1590,
        cashRegisterNumber: 182,
      })
      .subscribe();
  }
}
