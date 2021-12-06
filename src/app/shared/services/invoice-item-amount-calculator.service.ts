import { Injectable } from '@angular/core';
import { UOM } from 'src/app/shared/enums/uom-enum';
import { FrameModel } from 'src/app/shared/models/frame-model';
import { InvoiceItemModel } from 'src/app/shared/models/invoice-item.model';
import { PasspartuColorModel } from '../models/passpartu-color-model';
import { ProductModel } from '../models/product-model';

Injectable();
export class InvoiceItemCalculatorService {
  public getInvoiceItemAmount(invoiceItem: InvoiceItemModel): number {
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
      passpartuPrice = this.getPasspartuLengthForInvoiceItems([invoiceItem])[0]
        .amount;
    }
    if (invoiceItem.mirror) {
      mirrorPrice = this.getMirrorLengthForInvoiceItems([invoiceItem])[0]
        .amount;
    }
    if (invoiceItem.mirror && invoiceItem.faceting) {
      facetingPrice = this.getFacetingLengthForInvoiceItems([invoiceItem])[0]
        .amount;
      const surface =
        invoiceItem.dimensionsHeight * 2 + invoiceItem.dimensionsWidth * 2;
    }
    if (invoiceItem.mirror && invoiceItem.sanding) {
      sandingPrice = this.getSandingLengthForInvoiceItems([invoiceItem])[0]
        .amount;
    }
    this.getFramesLengthAmountForInvoiceItems([invoiceItem]).forEach((f) => {
      framesPrice += f.amount;
    });
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
      if (item.selectedFrames) {
        let height = item.dimensionsHeight;
        let width = item.dimensionsWidth;
        for (let i = 0; i < item.selectedFrames.length; i++) {
          if (i > 0) {
            height += (item.selectedFrames[i - 1].frame.frameWidthMM * 2) / 10;
            width += (item.selectedFrames[i - 1].frame.frameWidthMM * 2) / 10;
          }
          if (item.passpartuWidth && item.passpartuWidth > 0) {
            const passLengthIncrease =
              this.transformMeasure(
                this.transformPasspartuWidth(item.passpartuWidth),
                item.passpartuWidthUom,
                item.dimensionsUom
              ) * 2;
            height += passLengthIncrease;
            width += passLengthIncrease;
          }
          let length = height * 2 + width * 2;
          length += (item.selectedFrames[i].frame.frameWidthMM * 8) / 10;
          length = this.transformMeasure(
            length,
            item.dimensionsUom,
            item.selectedFrames[i].frame.uom
          );
          length = this.roundOnDigits(length);
          let amount = length * item.selectedFrames[i].frame.pricePerUom;
          amount = this.roundOnDigits(amount);
          let indexOf = result.findIndex(
            (r) => r.frame.oid === item.selectedFrames[i].frame.oid
          );
          if (indexOf >= 0) {
            let newElement = { ...result[indexOf] };
            newElement.amount = this.roundOnDigits(
              (newElement.amount += amount)
            );
            newElement.length = this.roundOnDigits(
              (newElement.length += length)
            );
            result.splice(indexOf, 1, newElement);
          } else {
            result.push({
              frame: item.selectedFrames[i].frame,
              uom: item.selectedFrames[i].frame.uom,
              length: this.roundOnDigits(length),
              amount: this.roundOnDigits(amount),
            });
          }
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
            width += this.transformPasspartuWidth(item.passpartuWidth) * 2;
            height += this.transformPasspartuWidth(item.passpartuWidth) * 2;
          } else if (
            item.dimensionsUom === UOM.CENTIMETER &&
            item.passpartuWidthUom === UOM.MILIMETER
          ) {
            width +=
              (this.transformPasspartuWidth(item.passpartuWidth) / 10) * 2;
            height +=
              (this.transformPasspartuWidth(item.passpartuWidth) / 10) * 2;
          }
        }
        let surface =
          this.getConstructionMeasure(height) *
          this.getConstructionMeasure(width);
        surface = this.transformMeasure(
          this.roundOnDigits(surface),
          UOM.CENTIMETER2,
          item.glass.uom
        );
        let glassPrice = item.glass.pricePerUom * surface;

        let indexOf = result.findIndex((g) => g.glass.oid === item.glass.oid);
        if (indexOf >= 0) {
          let newElement = { ...result[indexOf] };
          newElement.length = this.roundOnDigits(
            (newElement.length += this.roundOnDigits(surface))
          );
          newElement.amount = this.roundOnDigits(
            (newElement.amount += this.roundOnDigits(glassPrice))
          );
          result.splice(indexOf, 1, newElement);
        } else {
          result.push({
            glass: item.glass,
            uom: item.glass.uom,
            length: this.roundOnDigits(surface),
            amount: this.roundOnDigits(glassPrice),
          });
        }
      }
    });
    return result;
  }

  getMirrorLengthForInvoiceItems(
    invoiceItems: InvoiceItemModel[]
  ): { mirror: ProductModel; uom: UOM; length: number; amount: number }[] {
    const result: {
      mirror: ProductModel;
      uom: UOM;
      length: number;
      amount: number;
    }[] = [];
    invoiceItems.forEach((item) => {
      if (item.mirror) {
        let width = item.dimensionsWidth;
        let height = item.dimensionsHeight;
        let surface =
          this.getConstructionMeasure(height) *
          this.getConstructionMeasure(width);
        surface = this.roundOnDigits(surface);

        let mirrorPrice =
          item.mirror.pricePerUom *
          this.transformMeasure(surface, UOM.CENTIMETER2, item.mirror.uom);

        let indexOf = result.findIndex((g) => g.mirror.oid === item.mirror.oid);
        if (indexOf >= 0) {
          let newElement = { ...result[indexOf] };
          newElement.length = this.roundOnDigits(
            (newElement.length += this.roundOnDigits(surface))
          );
          newElement.amount = this.roundOnDigits(
            (newElement.amount += this.roundOnDigits(mirrorPrice))
          );
          result.splice(indexOf, 1, newElement);
        } else {
          result.push({
            mirror: item.mirror,
            uom: item.mirror.uom,
            length: this.roundOnDigits(
              this.transformMeasure(surface, UOM.CENTIMETER2, item.mirror.uom)
            ),
            amount: this.roundOnDigits(mirrorPrice),
          });
        }
      }
    });
    return result;
  }

  getFacetingLengthForInvoiceItems(
    invoiceItems: InvoiceItemModel[]
  ): { faceting: ProductModel; uom: UOM; length: number; amount: number }[] {
    const result: {
      faceting: ProductModel;
      uom: UOM;
      length: number;
      amount: number;
    }[] = [];
    invoiceItems.forEach((item) => {
      if (item.faceting) {
        let width = item.dimensionsWidth;
        let height = item.dimensionsHeight;

        let length = height * 2 + width * 2;
        length = this.roundOnDigits(length);

        let facetingPrice =
          item.faceting.pricePerUom *
          this.transformMeasure(length, UOM.CENTIMETER, item.faceting.uom);
        let indexOf = result.findIndex(
          (g) => g.faceting.oid === item.faceting.oid
        );
        if (indexOf >= 0) {
          let newElement = { ...result[indexOf] };
          newElement.length = this.roundOnDigits(
            (newElement.length += this.roundOnDigits(length))
          );
          newElement.amount = this.roundOnDigits(
            (newElement.amount += this.roundOnDigits(facetingPrice))
          );
          result.splice(indexOf, 1, newElement);
        } else {
          result.push({
            faceting: item.faceting,
            uom: item.faceting.uom,
            length: this.roundOnDigits(
              this.transformMeasure(length, UOM.CENTIMETER, item.faceting.uom)
            ),
            amount: this.roundOnDigits(facetingPrice),
          });
        }
      }
    });
    return result;
  }

  getSandingLengthForInvoiceItems(
    invoiceItems: InvoiceItemModel[]
  ): { sanding: ProductModel; uom: UOM; length: number; amount: number }[] {
    const result: {
      sanding: ProductModel;
      uom: UOM;
      length: number;
      amount: number;
    }[] = [];
    invoiceItems.forEach((item) => {
      if (item.sanding) {
        let width = item.dimensionsWidth;
        let height = item.dimensionsHeight;

        let surface =
          this.getConstructionMeasure(height) *
          this.getConstructionMeasure(width);
        surface = this.roundOnDigits(surface);

        let sandingPrice =
          item.sanding.pricePerUom *
          this.transformMeasure(surface, UOM.CENTIMETER2, item.sanding.uom);

        let indexOf = result.findIndex(
          (g) => g.sanding.oid === item.sanding.oid
        );
        if (indexOf >= 0) {
          let newElement = { ...result[indexOf] };
          newElement.length = this.roundOnDigits(
            (newElement.length += this.roundOnDigits(surface))
          );
          newElement.amount = this.roundOnDigits(
            (newElement.amount += this.roundOnDigits(sandingPrice))
          );
          result.splice(indexOf, 1, newElement);
        } else {
          result.push({
            sanding: item.sanding,
            uom: item.sanding.uom,
            length: this.roundOnDigits(
              this.transformMeasure(surface, UOM.CENTIMETER2, item.sanding.uom)
            ),
            amount: this.roundOnDigits(sandingPrice),
          });
        }
      }
    });
    return result;
  }

  getPasspartuLengthForInvoiceItems(invoiceItems: InvoiceItemModel[]): {
    passpartuColor: PasspartuColorModel;
    uom: UOM;
    length: number;
    amount: number;
  }[] {
    const result: {
      passpartuColor: PasspartuColorModel;
      uom: UOM;
      length: number;
      amount: number;
    }[] = [];
    invoiceItems.forEach((item) => {
      if (item.passpartuColor) {
        let width = item.dimensionsWidth;
        let height = item.dimensionsHeight;
        if (item.passpartuColor) {
          if (item.dimensionsUom === item.passpartuWidthUom) {
            width += this.transformPasspartuWidth(item.passpartuWidth) * 2;
            height += this.transformPasspartuWidth(item.passpartuWidth) * 2;
          } else if (
            item.dimensionsUom === UOM.CENTIMETER &&
            item.passpartuWidthUom === UOM.MILIMETER
          ) {
            width +=
              (this.transformPasspartuWidth(item.passpartuWidth) / 10) * 2;
            height +=
              (this.transformPasspartuWidth(item.passpartuWidth) / 10) * 2;
          }
        }
        let surface =
          this.getConstructionMeasure(height) *
          this.getConstructionMeasure(width);
        surface = this.roundOnDigits(surface);

        let passpartuPrice =
          item.passpartuColor.passpartu.pricePerUom *
          this.transformMeasure(
            surface,
            UOM.CENTIMETER2,
            item.passpartuColor.passpartu.uom
          );

        let indexOf = result.findIndex(
          (g) => g.passpartuColor.oid === item.passpartuColor.oid
        );
        if (indexOf >= 0) {
          let newElement = { ...result[indexOf] };
          newElement.length = this.roundOnDigits(
            (newElement.length += this.roundOnDigits(surface))
          );
          newElement.amount = this.roundOnDigits(
            (newElement.amount += this.roundOnDigits(passpartuPrice))
          );
          result.splice(indexOf, 1, newElement);
        } else {
          result.push({
            passpartuColor: item.passpartuColor,
            uom: item.passpartuColor.passpartu.uom,
            length: this.roundOnDigits(
              this.transformMeasure(
                surface,
                UOM.CENTIMETER2,
                item.passpartuColor.passpartu.uom
              )
            ),
            amount: this.roundOnDigits(passpartuPrice),
          });
        }
      }
    });
    return result;
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

  private transformPasspartuWidth(passpartuWidth: number): number {
    if (passpartuWidth > 0 && passpartuWidth <= 5) {
      return 5;
    } else if (passpartuWidth > 5 && passpartuWidth <= 10) {
      return 10;
    }
    return passpartuWidth;
  }

  private transformMeasure(amount: number, uom: UOM, targetUom: UOM): number {
    let value: number = 0;
    if (uom === UOM.MILIMETER) {
      if (targetUom === UOM.MILIMETER) {
        value = amount;
      } else if (targetUom === UOM.CENTIMETER) {
        value = amount / 10;
      } else if (targetUom === UOM.METER) {
        value = amount / 1000;
      }
    } else if (uom === UOM.CENTIMETER) {
      if (targetUom === UOM.MILIMETER) {
        value = amount * 10;
      } else if (targetUom === UOM.CENTIMETER) {
        value = amount;
      } else if (targetUom === UOM.METER) {
        value = amount / 100;
      }
    } else if (uom === UOM.METER) {
      if (targetUom === UOM.MILIMETER) {
        value = amount * 1000;
      } else if (targetUom === UOM.CENTIMETER) {
        value = amount * 100;
      } else if (targetUom === UOM.METER) {
        value = amount;
      }
    } else if (uom === UOM.MILIMETER2) {
      if (targetUom === UOM.MILIMETER2) {
        value = amount;
      } else if (targetUom === UOM.CENTIMETER2) {
        value = amount / 100;
      } else if (targetUom === UOM.METER2) {
        value = amount / 1000000;
      }
    } else if (uom === UOM.CENTIMETER2) {
      if (targetUom === UOM.MILIMETER2) {
        value = amount * 100;
      } else if (targetUom === UOM.CENTIMETER2) {
        value = amount;
      } else if (targetUom === UOM.METER2) {
        value = amount / 10000;
      }
    } else if (uom === UOM.METER2) {
      if (targetUom === UOM.MILIMETER2) {
        value = amount * 1000000;
      } else if (targetUom === UOM.CENTIMETER2) {
        value = amount * 10000;
      } else if (targetUom === UOM.METER2) {
        value = amount;
      }
    }
    return value;
  }

  roundOnDigits(value: number, digits: number = 3): number {
    return Math.round(value * Math.pow(10, digits)) / Math.pow(10, digits);
  }
}
