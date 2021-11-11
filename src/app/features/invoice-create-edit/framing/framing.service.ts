import { Injectable } from '@angular/core';
import { UOM } from 'src/app/shared/enums/uom-enum';
import { InvoiceItemModel } from 'src/app/shared/models/invoice-item.model';

Injectable();
export class FramingService {
  public getInvoiceItemAmount(invoiceItem: InvoiceItemModel): number {
    let glassPrice = 0;
    let passpartuPrice = 0;
    let mirrorPrice = 0;
    let framesPrice = 0;
    if (invoiceItem.glass) {
      const surface =
        this.getConstructionMeasure(invoiceItem.dimensions.height) *
        this.getConstructionMeasure(invoiceItem.dimensions.width);
      glassPrice = this.getPricePerUom(
        { ppUom: invoiceItem.glass.pricePerUom, uom: invoiceItem.glass.uom },
        { count: surface, uom: UOM.CENTIMETER2 }
      );
    }
    if (invoiceItem.passpartu) {
      const surface =
        this.getConstructionMeasure(invoiceItem.dimensions.height) *
        this.getConstructionMeasure(invoiceItem.dimensions.width);
      passpartuPrice = this.getPricePerUom(
        {
          ppUom: invoiceItem.passpartu.value.passpartu.pricePerUom,
          uom: invoiceItem.passpartu.value.passpartu.uom,
        },
        { count: surface, uom: UOM.CENTIMETER2 }
      );
    }
    if (invoiceItem.mirror) {
      const surface =
        this.getConstructionMeasure(invoiceItem.dimensions.height) *
        this.getConstructionMeasure(invoiceItem.dimensions.width);
      mirrorPrice = this.getPricePerUom(
        { ppUom: invoiceItem.mirror.pricePerUom, uom: invoiceItem.mirror.uom },
        { count: surface, uom: UOM.CENTIMETER2 }
      );
    }
    if (invoiceItem.selectedFrames.length > 0) {
      invoiceItem.selectedFrames.forEach((frame) => {
        framesPrice += this.getFramePrice(
          invoiceItem.dimensions.height,
          invoiceItem.dimensions.width,
          invoiceItem.dimensions.uom,
          frame.frameWidthMM,
          frame.pricePerUom,
          frame.uom
        );
      });
    }
    return glassPrice + passpartuPrice + mirrorPrice + framesPrice;
  }

  private getFramePrice(
    imageHeight: number,
    imageWidth: number,
    imageUom: UOM,
    frameWidthMM: number,
    framePpUom: number,
    frameUom: UOM
  ): number {
    let amount = 0;
    let length = imageHeight * 2 + imageWidth * 2;
    if (imageUom === UOM.CENTIMETER) {
      if (frameUom === UOM.CENTIMETER) {
        length += length + (frameWidthMM * 8) / 10;
        amount = length * framePpUom;
      } else if (frameUom === UOM.METER) {
        length += length + (frameWidthMM * 8) / 10;
        amount = (length * framePpUom) / 100;
      }
    }
    return amount;
  }

  private getConstructionMeasure(num: number): number {
    num++;
    if (num % 3 === 0) {
      return num;
    } else if (num++) {
      return num;
    } else if (num++) {
      return num;
    }
  }

  private getPricePerUom(
    price: { ppUom: number; uom: UOM },
    unit: { count: number; uom: UOM }
  ): number {
    if (unit.uom === UOM.CENTIMETER2) {
      if (price.uom === UOM.CENTIMETER2) {
        return unit.count * price.ppUom;
      } else if (price.uom === UOM.METER2) {
        return (unit.count * price.ppUom) / 10000;
      }
    } else if (unit.uom === UOM.CENTIMETER) {
      if (price.uom === UOM.CENTIMETER) {
        return unit.count * price.ppUom;
      } else if (price.uom === UOM.METER) {
        return (unit.count * price.ppUom) / 100;
      }
    }
    return 0;
  }

  roundOnDigits(value: number, digits: number = 3): number {
    // TODO
    let newNumber = value;

    return newNumber;
  }
}
