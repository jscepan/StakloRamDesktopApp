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
        name: 'Staklo 1',
        uom: UOM.CENTIMETER,
        pricePerUom: 1000,
        cashRegisterNumber: 1,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '2',
        name: 'Staklo 2',
        uom: UOM.CENTIMETER,
        pricePerUom: 2000,
        cashRegisterNumber: 2,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '3',
        name: 'Staklo 3',
        uom: UOM.CENTIMETER,
        pricePerUom: 3000,
        cashRegisterNumber: 3,
      })
      .subscribe();
  }
}
