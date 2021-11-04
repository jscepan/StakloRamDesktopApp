import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FrameModel } from '../models/frame-model';
import { SubscriptionManager } from './subscription.manager';

@Injectable()
export class AppDataService {
  private subs = new SubscriptionManager();

  private $dataFrames: BehaviorSubject<FrameModel[]> = new BehaviorSubject<
    FrameModel[]
  >([]);
  public readonly dataFrames: Observable<FrameModel[]> =
    this.$dataFrames.asObservable();
}
