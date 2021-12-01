import { Injectable } from '@angular/core';
import { UOM } from 'src/app/shared/enums/uom-enum';
import { FrameModel } from 'src/app/shared/models/frame-model';
import { InvoiceItemModel } from 'src/app/shared/models/invoice-item.model';

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
      const surface =
        this.getConstructionMeasure(invoiceItem.dimensionsHeight) *
        this.getConstructionMeasure(invoiceItem.dimensionsWidth);
      glassPrice = this.calcPriceBaseOnUom(
        { ppUom: invoiceItem.glass.pricePerUom, uom: invoiceItem.glass.uom },
        { count: surface, uom: UOM.CENTIMETER2 }
      );
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
    // if (invoiceItem.selectedFrames.length > 0) {

    //   invoiceItem.selectedFrames.forEach((frame) => {
    //     framesPrice += this.getFramePrice(
    //       invoiceItem.dimensionsHeight,
    //       invoiceItem.dimensionsWidth,
    //       invoiceItem.dimensionsUom,
    //       frame.frame.frameWidthMM,
    //       frame.frame.pricePerUom,
    //       frame.frame.uom
    //     );
    //   });
    // }
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
  ): { frame: FrameModel; length: number; amount: number }[] {
    let result: { frame: FrameModel; length: number; amount: number }[] = [];
    invoiceItems.forEach((item) => {
      let height = item.dimensionsHeight;
      let width = item.dimensionsWidth;
      for (let i = 0; i < item.selectedFrames.length; i++) {
        console.log('frame');
        console.log(item.selectedFrames[i].frame);
        if (i > 0) {
          console.log('Ovo je sad frame sa indeksom: ' + i);
          height += item.selectedFrames[i - 1].frame.frameWidthMM / 10;
          width += item.selectedFrames[i - 1].frame.frameWidthMM / 10;
        }
        console.log(
          'Sirina prethodnog rama je: ' +
            item.selectedFrames[i - 1].frame.frameWidthMM +
            ', pa visina je ' +
            height +
            ', a sirina: ' +
            width
        );
        const fla = this.getFrameLengthAndPrice(
          height,
          width,
          item.dimensionsUom,
          item.selectedFrames[i].frame.frameWidthMM,
          item.selectedFrames[i].frame.pricePerUom,
          item.selectedFrames[i].frame.uom
        );
        result.push({
          frame: item.selectedFrames[i].frame,
          length: fla.length,
          amount: fla.amount,
        });
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
    console.log('stiglo je');
    console.log('imageHeight');
    console.log(imageHeight);
    console.log('imageWidth');
    console.log(imageWidth);
    console.log('imageUom');
    console.log(imageUom);
    console.log('frameWidthMM');
    console.log(frameWidthMM);
    console.log('framePpUom');
    console.log(framePpUom);
    console.log('frameUom');
    console.log(frameUom);
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
    console.log('vracam: ' + length + ' ,amount: ' + amount);
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
