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
        name: 'Passpartu 1',
        uom: UOM.CENTIMETER,
        pricePerUom: 1000,
        cashRegisterNumber: 11,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '2',
        name: 'Passpartu 2',
        uom: UOM.CENTIMETER,
        pricePerUom: 2000,
        cashRegisterNumber: 12,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '3',
        name: 'Passpartu 3',
        uom: UOM.CENTIMETER,
        pricePerUom: 3000,
        cashRegisterNumber: 13,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '4',
        name: 'Passpartu 4',
        uom: UOM.CENTIMETER,
        pricePerUom: 4000,
        cashRegisterNumber: 14,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '5',
        name: 'Passpartu 5',
        uom: UOM.CENTIMETER,
        pricePerUom: 5000,
        cashRegisterNumber: 15,
      })
      .subscribe();
  }
}
