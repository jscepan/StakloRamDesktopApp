import { Injectable } from '@angular/core';
import { InvoiceModel } from '../models/invoice-model';
import { BaseWebService } from './base-web.service';
import { EntityBaseWebService } from './entity-base-web.service';

@Injectable()
export class InvoiceWebService extends EntityBaseWebService<InvoiceModel> {
  constructor(public baseWebService: BaseWebService) {
    super(baseWebService, 'http://localhost:6768/invoices');
  }
}
