import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { Entity } from 'src/app/shared/components/form/form.component';
import { TableShow } from 'src/app/shared/components/table-show/table-show.component';
import { PasspartuColorModel } from 'src/app/shared/models/passpartu-color-model';
import { PasspartuDataStoreService } from 'src/app/shared/services/data-store-services/passpartu-data-store.service';
import { ProductSettings } from '../product-settings.interface';

@Injectable()
export class MapPasspartuColorService
  implements ProductSettings<PasspartuColorModel>
{
  passSubscription: Subscription;

  constructor(
    private translateService: TranslateService,
    private passpartusStoreService: PasspartuDataStoreService
  ) {}

  createEmptyEntity(): Observable<Entity[]> {
    return new Observable((subscriber) => {
      this.passSubscription = this.passpartusStoreService.entities.subscribe(
        (passpartues) => {
          let optionalValues: KeyValue<string, string>[] = [];
          passpartues.forEach((p) => {
            optionalValues.push({
              key: p.oid,
              value:
                p.name +
                ', ' +
                this.translateService.instant('id') +
                ': ' +
                p.oid +
                ', ' +
                this.translateService.instant('ppUom') +
                ': ' +
                p.pricePerUom,
            });
          });

          let entities: Entity[] = [
            {
              label: {
                key: 'name',
                value: this.translateService.instant('name'),
              },
              type: 'string',
              value: '',
              required: true,
            },
            {
              label: {
                key: 'passpartu',
                value: this.translateService.instant('passpartu'),
              },
              type: 'select',
              value: passpartues[0].oid,
              optionalValues,
              required: true,
            },
          ];
          subscriber.next(entities);
          subscriber.complete();
          this.passSubscription.unsubscribe();
        }
      );
    });
  }

  mapEntityToFrame(entity: PasspartuColorModel): Observable<Entity[]> {
    return new Observable((subscriber) => {
      this.passSubscription = this.passpartusStoreService.entities.subscribe(
        (passpartues) => {
          let optionalValues: KeyValue<string, string>[] = [];
          passpartues.forEach((p) => {
            optionalValues.push({
              key: p.oid,
              value:
                p.name +
                ', ' +
                this.translateService.instant('id') +
                ': ' +
                p.oid +
                ', ' +
                this.translateService.instant('ppUom') +
                ': ' +
                p.pricePerUom,
            });
          });

          let entities: Entity[] = [
            {
              label: {
                key: 'id',
                value: this.translateService.instant('id'),
              },
              type: 'string',
              value: entity.oid,
              disabled: true,
            },
            {
              label: {
                key: 'name',
                value: this.translateService.instant('name'),
              },
              type: 'string',
              value: entity.name,
              required: true,
            },
            {
              label: {
                key: 'passpartu',
                value: this.translateService.instant('passpartu'),
              },
              type: 'select',
              value: passpartues[0].oid,
              optionalValues,
              required: true,
            },
          ];

          subscriber.next(entities);
          subscriber.complete();
        }
      );
    });
  }

  getTableData(entities: PasspartuColorModel[]): TableShow {
    let table = {
      header: [
        this.translateService.instant('id'),
        this.translateService.instant('name'),
        this.translateService.instant('passpartu'),
      ],
      data: [],
    };
    entities.forEach((entity) => {
      table.data.push(entity.oid);
      table.data.push(entity.name);
      table.data.push(entity.passpartu.name);
    });
    return table;
  }
}
