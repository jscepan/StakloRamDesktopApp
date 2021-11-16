import { Injectable } from '@angular/core';
import { UOM } from '../../enums/uom-enum';
import { FrameModel } from '../../models/frame-model';
import { BaseWebService } from '../base-web.service';
import { BaseDataStoreService } from './base-data-store.service';

@Injectable({ providedIn: 'root' })
export class FrameDataStoreService extends BaseDataStoreService<FrameModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, 'frame');
    this.kreiraj();
  }

  kreiraj(): void {
    super
      .createNewEntity({
        oid: '01',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 490,
        frameWidthMM: 12.5,
        cashRegisterNumber: 143,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '02',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 490,
        frameWidthMM: 12.5,
        cashRegisterNumber: 144,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '03',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 590,
        frameWidthMM: 30,
        cashRegisterNumber: 145,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '04',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 300,
        frameWidthMM: 0,
        cashRegisterNumber: 146,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '05',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 590,
        frameWidthMM: 23,
        cashRegisterNumber: 147,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '06',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 590,
        frameWidthMM: 20,
        cashRegisterNumber: 148,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '07',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 680,
        frameWidthMM: 0.05,
        cashRegisterNumber: 149,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '08',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 650,
        frameWidthMM: 30,
        cashRegisterNumber: 150,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '09',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 590,
        frameWidthMM: 20,
        cashRegisterNumber: 151,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '10',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 650,
        frameWidthMM: 40,
        cashRegisterNumber: 152,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '11',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 590,
        frameWidthMM: 25,
        cashRegisterNumber: 153,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '12',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 495,
        frameWidthMM: 20,
        cashRegisterNumber: 154,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '13',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 650,
        frameWidthMM: 40,
        cashRegisterNumber: 155,
      })
      .subscribe();

    super
      .createNewEntity({
        oid: '14',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 690,
        frameWidthMM: 40,
        cashRegisterNumber: 156,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '15',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 1650,
        frameWidthMM: 65,
        cashRegisterNumber: 157,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '16',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 790,
        frameWidthMM: 50,
        cashRegisterNumber: 158,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '17',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 790,
        frameWidthMM: 55,
        cashRegisterNumber: 159,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '18',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 850,
        frameWidthMM: 55,
        cashRegisterNumber: 160,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '19',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 1150,
        frameWidthMM: 80,
        cashRegisterNumber: 161,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '20',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 0,
        frameWidthMM: 0.05,
        cashRegisterNumber: 162,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '21',
        name: 'Č. GOBLEN 8cm',
        uom: UOM.METER,
        pricePerUom: 1500,
        frameWidthMM: 80,
        cashRegisterNumber: 163,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '22',
        name: 'Č. GOBLEN 10cm',
        uom: UOM.METER,
        pricePerUom: 1500,
        frameWidthMM: 100,
        cashRegisterNumber: 163,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '23',
        name: 'OVAL GOBLEN 8cm',
        uom: UOM.METER,
        pricePerUom: 1500,
        frameWidthMM: 80,
        cashRegisterNumber: 163,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '24',
        name: 'OVAL GOBLEN 10cm',
        uom: UOM.METER,
        pricePerUom: 1500,
        frameWidthMM: 100,
        cashRegisterNumber: 163,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '25',
        name: 'BLIND RAM',
        uom: UOM.METER,
        pricePerUom: 180,
        frameWidthMM: 0,
        cashRegisterNumber: 164,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '26',
        name: 'MEDIJAPAN OVAL',
        uom: UOM.METER,
        pricePerUom: 1500,
        frameWidthMM: 0,
        cashRegisterNumber: 165,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '27',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 1500,
        frameWidthMM: 55,
        cashRegisterNumber: 166,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '28',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 1500,
        frameWidthMM: 50,
        cashRegisterNumber: 167,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '29',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 1680,
        frameWidthMM: 60,
        cashRegisterNumber: 168,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '30',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 1830,
        frameWidthMM: 60,
        cashRegisterNumber: 169,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '31',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 1900,
        frameWidthMM: 75,
        cashRegisterNumber: 170,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '32',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 3190,
        frameWidthMM: 80,
        cashRegisterNumber: 171,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '33',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 3660,
        frameWidthMM: 80,
        cashRegisterNumber: 172,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '34',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 2000,
        frameWidthMM: 80,
        cashRegisterNumber: 173,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '35',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 2600,
        frameWidthMM: 80,
        cashRegisterNumber: 174,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '36',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 1680,
        frameWidthMM: 60,
        cashRegisterNumber: 175,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '37',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 0,
        frameWidthMM: 0,
        cashRegisterNumber: 176,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '38',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 0,
        frameWidthMM: 0,
        cashRegisterNumber: 177,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '39',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 0,
        frameWidthMM: 0,
        cashRegisterNumber: 178,
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '40',
        name: 'RAM',
        uom: UOM.METER,
        pricePerUom: 0,
        frameWidthMM: 0,
        cashRegisterNumber: 179,
      })
      .subscribe();
  }
}
