import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { KeyboardAlphabetComponentService } from 'src/app/shared/components/keyboard/alphabet/keyboard-alphabet.component.service';
import { TableShow } from 'src/app/shared/components/table-show/table-show.component';
import { InvoiceModel } from 'src/app/shared/models/invoice-model';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { InvoiceWebService } from 'src/app/shared/services/web-services/invoice.web.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [InvoiceWebService, KeyboardAlphabetComponentService],
})
export class SearchComponent implements OnInit, OnDestroy {
  private subs: SubscriptionManager = new SubscriptionManager();

  private invoices$: BehaviorSubject<InvoiceModel[]> = new BehaviorSubject<
    InvoiceModel[]
  >([]);

  invoices: TableShow;

  // Filter data
  buyerName: string = this.translateService.instant('buyerName');

  constructor(
    private router: Router,
    private webService: InvoiceWebService,
    private keyboardAlphabetComponentService: KeyboardAlphabetComponentService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.invoices$.asObservable().subscribe((invoices) => {
      let table = {
        header: [
          this.translateService.instant('code'),
          this.translateService.instant('date'),
          this.translateService.instant('advancePayment'),
          this.translateService.instant('buyerName'),
        ],
        data: [],
      };
      invoices.forEach((entity) => {
        table.data.push(entity.oid);
        table.data.push(entity.createDate);
        table.data.push(entity.advancePayment);
        table.data.push(entity.buyerName);
      });
      this.invoices = table;
    });
  }

  editInvoice(oid: string): void {
    this.router.navigate(['invoice-create-edit', 'edit', oid]);
  }

  deleteInvoice(oid: string): void {
    // TODO
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  insertBuyerName(): void {
    this.subs.sink = this.keyboardAlphabetComponentService
      .openDialog(
        this.buyerName,
        this.translateService.instant('insertBuyerName')
      )
      .subscribe((value) => {
        if (value) {
          this.buyerName = value;
        }
      });
  }

  useFilter(): void {
    this.subs.sink = this.webService
      .searchEntities(this.buyerName)
      .subscribe((invoices) => {
        this.invoices$.next(invoices);
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
