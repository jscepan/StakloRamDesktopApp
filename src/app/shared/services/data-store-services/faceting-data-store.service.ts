import { Injectable } from '@angular/core';
import { UOM } from '../../enums/uom-enum';
import { ProductModel } from '../../models/product-model';
import { BaseWebService } from '../base-web.service';
import { BaseDataStoreService } from './base-data-store.service';

@Injectable()
export class FacetingDataStoreService extends BaseDataStoreService<ProductModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, 'faceting');
    this.kreiraj();
  }

  kreiraj(): void {
    super
      .createNewEntity({
        oid: '01',
        name: 'Fazetiranje do 10mm',
        uom: UOM.METER,
        pricePerUom: 250,
        cashRegisterNumber: 125,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '02',
        name: 'Fazetiranje do 15mm',
        uom: UOM.METER,
        pricePerUom: 300,
        cashRegisterNumber: 126,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '03',
        name: 'Fazetiranje do 20mm',
        uom: UOM.METER,
        pricePerUom: 360,
        cashRegisterNumber: 127,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '04',
        name: 'Fazetiranje do 25mm',
        uom: UOM.METER,
        pricePerUom: 430,
        cashRegisterNumber: 128,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '05',
        name: 'Fazetiranje do 30mm',
        uom: UOM.METER,
        pricePerUom: 520,
        cashRegisterNumber: 129,
      })
      .subscribe();
  }
}
