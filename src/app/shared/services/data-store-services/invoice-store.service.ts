import { Injectable } from '@angular/core';
import { InvoiceModel } from '../../models/invoice-model';
import { BaseWebService } from '../base-web.service';
import { BaseDataStoreService } from './base-data-store.service';

@Injectable()
export class InvoiceStoreService extends BaseDataStoreService<InvoiceModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, 'invoice');
  }
}
