import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MeAlertBoxService } from './me-alert-box.service';
import { MeBasicAlertComponent } from '../me-basic-alert/me-basic-alert.component';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { MeBasicAlertEventsTypes } from '../me-basic-alert/me-basic-alert.interface';

@Component({
  selector: 'me-alert-box',
  templateUrl: './me-alert-box.component.html',
  styleUrls: ['me-alert-box.component.scss']
})
export class MeAlertBoxComponent implements OnInit, OnDestroy {
  @ViewChild('messageContainer', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;

  constructor(private alertBoxService: MeAlertBoxService, private cfr: ComponentFactoryResolver, private elRef: ElementRef) {}

  showMessageSubscription!: Subscription;

  private readonly ADD_ALERT_STYLES_DELAY = 200;
  private readonly ADD_ALERT_STYLES_DELAY_TRANSITION = 200;
  private readonly ALERT_ITEM_BOTTOM_MARGIN = 10;
  private _alertsCount: number = 0;

  getUid(): string {
    return uuidv4();
  }

  ngOnInit(): void {
    this.showMessageSubscription = this.alertBoxService.showMsg$.subscribe((messageData) => {
      const factory = this.cfr.resolveComponentFactory(MeBasicAlertComponent);
      const componentRef = this.viewContainerRef.createComponent(factory);

      let timeOutId!: number;
      let alertComponentEventSubscription!: Subscription;

      componentRef.instance.data = {
        mode: messageData.alertData.mode,
        title: messageData.alertData.title,
        content: messageData.alertData.content
      };

      const alertsCount = ++this._alertsCount;
      const alertElements = this.elRef.nativeElement.querySelectorAll('me-basic-alert');

      componentRef.location.nativeElement.setAttribute('id', uuidv4());

      setTimeout(() => {
        let allAlertBoxElementsHeight = 0;

        for (const alertElement of alertElements) {
          allAlertBoxElementsHeight += alertElement.offsetHeight + this.ALERT_ITEM_BOTTOM_MARGIN;
        }

        for (const alertElement of alertElements) {
          alertElement.style.transform = `translateY(-${allAlertBoxElementsHeight}px)`;
        }
      }, this.ADD_ALERT_STYLES_DELAY * alertsCount);

      timeOutId = setTimeout(() => {
        this._removeAlertBox(componentRef);

        alertComponentEventSubscription.unsubscribe();
      }, messageData.duration + this.ADD_ALERT_STYLES_DELAY * alertsCount);

      alertComponentEventSubscription = componentRef.instance.eventOccurs.subscribe((event: { eventName: string }) => {
        if (event.eventName === MeBasicAlertEventsTypes.EXIT) {
          this._removeAlertBox(componentRef, () => {
            clearTimeout(timeOutId);
          });

          alertComponentEventSubscription.unsubscribe();
        }
      });
    });
  }

  private _removeAlertBox(componentRef: ComponentRef<MeBasicAlertComponent>, callBack?: () => void): void {
    const existingAlertElements = this.elRef.nativeElement.querySelectorAll('me-basic-alert');
    const componentViewRef = this.viewContainerRef.insert(componentRef.hostView);

    this.viewContainerRef.remove(this.viewContainerRef.indexOf(componentViewRef));
    this._alertsCount--;

    setTimeout(() => {
      const elementId = componentRef.location.nativeElement.getAttribute('id');

      let allAlertBoxElementsHeight = 0;

      for (const alertElement of existingAlertElements) {
        allAlertBoxElementsHeight += alertElement.offsetHeight ? alertElement.offsetHeight + this.ALERT_ITEM_BOTTOM_MARGIN : 0;
      }

      let currentElementPassed = false;

      for (const alertElement of existingAlertElements) {
        if (alertElement.getAttribute('id') === elementId) {
          currentElementPassed = true;
        }

        // This part is done for case when for example from 5 alert boxes
        // the middle one is removed. Then the top 2 boxes should go down slowly (animated)
        // but the translateY of 2 boxes in the bottom should be changed without transition as they should stay
        // in the bottom as they where before.
        if (currentElementPassed) {
          alertElement.style.transition = 'none';

          setTimeout(() => {
            alertElement.style.transition = 'all 0.5s';
          }, this.ADD_ALERT_STYLES_DELAY_TRANSITION);
        }

        alertElement.style.transform = `translateY(-${allAlertBoxElementsHeight}px)`;
      }
    });

    if (callBack) {
      callBack();
    }
  }

  ngOnDestroy(): void {
    this.showMessageSubscription.unsubscribe();
  }
}
