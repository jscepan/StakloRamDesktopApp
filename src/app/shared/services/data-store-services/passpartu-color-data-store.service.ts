import { Injectable } from '@angular/core';
import { UOM } from '../../enums/uom-enum';
import { PasspartuColorModel } from '../../models/passpartu-color-model';
import { BaseWebService } from '../web-services/base-web.service';
import { BaseDataStoreService } from './base-data-store.service';

@Injectable({ providedIn: 'root' })
export class PasspartuColorDataStoreService extends BaseDataStoreService<PasspartuColorModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, 'passpartuColor');
    this.kreiraj();
  }

  kreiraj(): void {
    super
      .createNewEntity({
        oid: '1',
        name: 'P1',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '2',
        name: 'P2',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '3',
        name: 'P3',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '4',
        name: 'P4',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '5',
        name: 'P5',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '6',
        name: 'P6',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '7',
        name: 'P7',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '8',
        name: 'P8',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '9',
        name: 'P9',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '10',
        name: 'P10',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '11',
        name: 'P11',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '12',
        name: 'P12',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '13',
        name: 'P13',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '14',
        name: 'P14',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '15',
        name: 'P15',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '16',
        name: 'P16',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '17',
        name: 'P17',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '18',
        name: 'P18',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '19',
        name: 'P19',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '20',
        name: 'P20',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '21',
        name: 'P21',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '22',
        name: 'P22',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '23',
        name: 'P23',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '24',
        name: 'P24',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '25',
        name: 'P25',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '26',
        name: 'P26',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '27',
        name: 'P27',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '28',
        name: 'P28',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '29',
        name: 'P29',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
    super
      .createNewEntity({
        oid: '30',
        name: 'P30',
        passpartu: {
          oid: '1',
          name: 'Paspartu',
          uom: UOM.METER2,
          pricePerUom: 1590,
          cashRegisterNumber: 182,
        },
      })
      .subscribe();
  }
}
