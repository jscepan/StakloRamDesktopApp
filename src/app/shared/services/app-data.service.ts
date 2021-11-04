import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UOM } from '../enums/uom-enum';
import { FrameModel } from '../models/frame-model';

@Injectable()
export class AppDataService {
  private $dataFrames: BehaviorSubject<FrameModel[]> = new BehaviorSubject<
    FrameModel[]
  >([]);
  public readonly dataFrames: Observable<FrameModel[]> =
    this.$dataFrames.asObservable();

  constructor() {
    this.$dataFrames.next([
      {
        oid: 'oid',
        name: 'name',
        uom: UOM.CENTIMETER,
        pricePerUom: 99999,
        frameWidthMM: 88888,
        cashRegisterNumber: 77777,
      },
      {
        oid: 'oid45',
        name: 'name',
        uom: UOM.CENTIMETER,
        pricePerUom: 99999,
        frameWidthMM: 88888,
        cashRegisterNumber: 77777,
      },
    ]);
  }

  public editFrame(entity: FrameModel): void {
    // TODO zapamti izmenu u bazi
    let xxx = this.$dataFrames.getValue().map((frame: FrameModel) => {
      return entity.oid === frame.oid ? entity : frame;
    });
    this.$dataFrames.next(xxx);
  }
}
