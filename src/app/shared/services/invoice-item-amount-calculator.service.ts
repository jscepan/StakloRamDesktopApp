import { Injectable } from '@angular/core';
import { UOM } from 'src/app/shared/enums/uom-enum';
import { FrameModel } from 'src/app/shared/models/frame-model';
import { InvoiceItemModel } from 'src/app/shared/models/invoice-item.model';
import { ProductModel } from '../models/product-model';

Injectable();
export class InvoiceItemCalculatorService {
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
      glassPrice = this.getGlassLengthForInvoiceItems([invoiceItem])[0].amount;
    }
    if (invoiceItem.passpartuColor) {
      const surface =
        this.getConstructionMeasure(invoiceItem.dimensionsHeight) *
        this.getConstructionMeasure(invoiceItem.dimensionsWidth);
      passpartuPrice = this.calcPriceBaseOnUom(
        {
          ppUom: invoiceItem.passpartuColor.passpartu.pricePerUom,
          uom: invoiceItem.passpartuColor.passpartu.uom,
        },
        { count: surface, uom: UOM.CENTIMETER2 }
      );
    }
    if (invoiceItem.mirror) {
      const surface =
        this.getConstructionMeasure(invoiceItem.dimensionsHeight) *
        this.getConstructionMeasure(invoiceItem.dimensionsWidth);
      mirrorPrice = this.calcPriceBaseOnUom(
        { ppUom: invoiceItem.mirror.pricePerUom, uom: invoiceItem.mirror.uom },
        { count: surface, uom: UOM.CENTIMETER2 }
      );
    }
    if (invoiceItem.faceting) {
      const surface =
        invoiceItem.dimensionsHeight * 2 + invoiceItem.dimensionsWidth * 2;
      facetingPrice = this.calcPriceBaseOnUom(
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
      sandingPrice = this.calcPriceBaseOnUom(
        {
          ppUom: invoiceItem.sanding.pricePerUom,
          uom: invoiceItem.sanding.uom,
        },
        { count: surface, uom: UOM.CENTIMETER2 }
      );
    }
    this.getFramesLengthAmountForInvoiceItems([invoiceItem]).forEach((f) => {
      framesPrice += this.roundOnDigits(f.length * f.amount, 2);
    });
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

  getFramesLengthAmountForInvoiceItems(
    invoiceItems: InvoiceItemModel[]
  ): { frame: FrameModel; uom: UOM; length: number; amount: number }[] {
    const result: {
      frame: FrameModel;
      uom: UOM;
      length: number;
      amount: number;
    }[] = [];
    invoiceItems.forEach((item) => {
      let height = item.dimensionsHeight;
      let width = item.dimensionsWidth;
      for (let i = 0; i < item.selectedFrames.length; i++) {
        if (i > 0) {
          height += item.selectedFrames[i - 1].frame.frameWidthMM / 10;
          width += item.selectedFrames[i - 1].frame.frameWidthMM / 10;
        }
        const fla = this.getFrameLengthAndPrice(
          height,
          width,
          item.dimensionsUom,
          item.selectedFrames[i].frame.frameWidthMM,
          item.selectedFrames[i].frame.pricePerUom,
          item.selectedFrames[i].frame.uom
        );
        let indexOf = result.findIndex(
          (r) => r.frame.oid === item.selectedFrames[i].frame.oid
        );
        if (indexOf >= 0) {
          let newElement = { ...result[indexOf] };
          newElement.amount += fla.amount;
          newElement.length += fla.length;
          result.splice(indexOf, 1, newElement);
        } else {
          result.push({
            frame: item.selectedFrames[i].frame,
            uom: item.selectedFrames[i].frame.uom,
            length: fla.length,
            amount: fla.amount,
          });
        }
      }
    });
    return result;
  }

  getGlassLengthForInvoiceItems(
    invoiceItems: InvoiceItemModel[]
  ): { glass: ProductModel; uom: UOM; length: number; amount: number }[] {
    const result: {
      glass: ProductModel;
      uom: UOM;
      length: number;
      amount: number;
    }[] = [];
    invoiceItems.forEach((item) => {
      if (item.glass) {
        let width = item.dimensionsWidth;
        let height = item.dimensionsHeight;
        if (item.passpartuColor) {
          if (item.dimensionsUom === item.passpartuWidthUom) {
            width += item.passpartuWidth * 2;
            height += item.passpartuWidth * 2;
          } else if (
            item.dimensionsUom === UOM.CENTIMETER &&
            item.passpartuWidthUom === UOM.MILIMETER
          ) {
            width += (item.passpartuWidth / 10) * 2;
            height += (item.passpartuWidth / 10) * 2;
          }
        }
        let surface =
          this.getConstructionMeasure(height) *
          this.getConstructionMeasure(width);
        console.log('surface');
        console.log(surface);
        let glassPrice = this.calcPriceBaseOnUom(
          { ppUom: item.glass.pricePerUom, uom: item.glass.uom },
          { count: surface, uom: UOM.CENTIMETER2 }
        );
        console.log('{ ppUom: item.glass.pricePerUom, uom: item.glass.uom }');
        console.log({ ppUom: item.glass.pricePerUom, uom: item.glass.uom });
        console.log('{ count: surface, uom: UOM.CENTIMETER2 }');
        console.log({ count: surface, uom: UOM.CENTIMETER2 });
        let indexOf = result.findIndex((g) => g.glass.oid === item.glass.oid);
        if (indexOf >= 0) {
          let newElement = { ...result[indexOf] };
          newElement.length += surface;
          newElement.amount += glassPrice;
          result.splice(indexOf, 1, newElement);
        } else {
          result.push({
            glass: item.glass,
            uom: item.glass.uom,
            length: surface,
            amount: glassPrice,
          });
        }
      }
    });
    return result;
  }

  private getFrameLengthAndPrice(
    imageHeight: number,
    imageWidth: number,
    imageUom: UOM,
    frameWidthMM: number,
    framePpUom: number,
    frameUom: UOM
  ): { length: number; amount: number } {
    let amount = 0;
    let length = imageHeight * 2 + imageWidth * 2;
    if (imageUom === UOM.CENTIMETER) {
      length += (frameWidthMM * 8) / 10;
      if (frameUom === UOM.METER) {
        length = length / 100;
      }
      amount = length * framePpUom;
    }
    return { length, amount };
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

  private calcPriceBaseOnUom(
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
        return unit.count * price.ppUom * 100;
      } else if (price.uom === UOM.METER) {
        return unit.count * price.ppUom;
      }
    } else if (unit.uom === UOM.METER2) {
      if (price.uom === UOM.CENTIMETER2) {
        return unit.count * price.ppUom * 10000;
      } else if (price.uom === UOM.METER2) {
        return unit.count * price.ppUom;
      }
    }
    return 0;
  }

  roundOnDigits(value: number, digits: number = 3): number {
    return Math.round(value * Math.pow(10, digits)) / Math.pow(10, digits);
  }
}
