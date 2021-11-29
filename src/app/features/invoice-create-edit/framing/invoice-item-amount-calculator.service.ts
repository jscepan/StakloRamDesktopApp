import { Injectable } from '@angular/core';
import { UOM } from 'src/app/shared/enums/uom-enum';
import { InvoiceItemModel } from 'src/app/shared/models/invoice-item.model';

Injectable();
export class InvoiceItemAmountCalculatorService {
  public getInvoiceItemAmount(invoiceItem: InvoiceItemModel): number {
    console.log('IZRACUNAJ ZA:');
    console.log(invoiceItem);
    let glassPrice = 0;
    let passpartuPrice = 0;
    let mirrorPrice = 0;
    let framesPrice = 0;
    let facetingPrice = 0;
    let sandingPrice = 0;
    if (invoiceItem.glass) {
      const surface =
        this.getConstructionMeasure(invoiceItem.dimensionsHeight) *
        this.getConstructionMeasure(invoiceItem.dimensionsWidth);
      glassPrice = this.getPricePerUom(
        { ppUom: invoiceItem.glass.pricePerUom, uom: invoiceItem.glass.uom },
        { count: surface, uom: UOM.CENTIMETER2 }
      );
    }
    if (invoiceItem.passpartuColor) {
      const surface =
        this.getConstructionMeasure(invoiceItem.dimensionsHeight) *
        this.getConstructionMeasure(invoiceItem.dimensionsWidth);
      passpartuPrice = this.getPricePerUom(
        {
          ppUom: invoiceItem.passpartuColor.value.passpartu.pricePerUom,
          uom: invoiceItem.passpartuColor.value.passpartu.uom,
        },
        { count: surface, uom: UOM.CENTIMETER2 }
      );
    }
    if (invoiceItem.mirror) {
      const surface =
        this.getConstructionMeasure(invoiceItem.dimensionsHeight) *
        this.getConstructionMeasure(invoiceItem.dimensionsWidth);
      mirrorPrice = this.getPricePerUom(
        { ppUom: invoiceItem.mirror.pricePerUom, uom: invoiceItem.mirror.uom },
        { count: surface, uom: UOM.CENTIMETER2 }
      );
    }
    if (invoiceItem.faceting) {
      const surface =
        invoiceItem.dimensionsHeight * 2 + invoiceItem.dimensionsWidth * 2;
      facetingPrice = this.getPricePerUom(
        {
          ppUom: invoiceItem.faceting.pricePerUom,
          uom: invoiceItem.faceting.uom,
        },
        { count: surface, uom: UOM.CENTIMETER }
      );
    }
    if (invoiceItem.sanding) {
      const surface =
        invoiceItem.dimensionsHeight * invoiceItem.dimensionsWidth;
      sandingPrice = this.getPricePerUom(
        {
          ppUom: invoiceItem.sanding.pricePerUom,
          uom: invoiceItem.sanding.uom,
        },
        { count: surface, uom: UOM.CENTIMETER2 }
      );
    }
    if (invoiceItem.selectedFrames.length > 0) {
      invoiceItem.selectedFrames.forEach((frame) => {
        framesPrice += this.getFramePrice(
          invoiceItem.dimensionsHeight,
          invoiceItem.dimensionsWidth,
          invoiceItem.dimensionsUom,
          frame.frame.frameWidthMM,
          frame.frame.pricePerUom,
          frame.frame.uom
        );
      });
    }
    console.log('glassPrice');
    console.log(glassPrice);
    console.log('passpartuPrice');
    console.log(passpartuPrice);
    console.log('mirrorPrice');
    console.log(mirrorPrice);
    console.log('framesPrice');
    console.log(framesPrice);
    console.log('facetingPrice');
    console.log(facetingPrice);
    console.log('sandingPrice');
    console.log(sandingPrice);
    let grossAmount =
      glassPrice +
      passpartuPrice +
      mirrorPrice +
      framesPrice +
      facetingPrice +
      sandingPrice;
    return this.roundOnDigits(grossAmount);
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
    let n = Math.floor(num);
    if (++n % 3 === 0) {
      return n;
    } else if (++n % 3 === 0) {
      return n;
    } else if (++n % 3 === 0) {
      return n;
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
    } else if (unit.uom === UOM.METER) {
      if (price.uom === UOM.CENTIMETER) {
        return unit.count * price.ppUom;
      } else if (price.uom === UOM.METER) {
        return (unit.count * price.ppUom) / 100;
      }
    }
    return 0;
  }

  roundOnDigits(value: number, digits: number = 3): number {
    return Math.round(value * Math.pow(10, digits)) / Math.pow(10, digits);
  }
}
