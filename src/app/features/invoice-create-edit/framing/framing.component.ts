import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionComponentService } from '@features/selection-popup/selection-component.service';
import { Constants } from 'src/app/shared/constants';
import { UOM } from 'src/app/shared/enums/uom-enum';
import { FrameModel } from 'src/app/shared/models/frame-model';
import { InvoiceItemModel } from 'src/app/shared/models/invoice-item.model';
import { AppSettingsService } from 'src/app/shared/services/app-settings.service';
import { FrameDataStoreService } from 'src/app/shared/services/data-store-services/frame-data-store.service';
import { GlassDataStoreService } from 'src/app/shared/services/data-store-services/glass-data-store.service';
import { DraftInvoicesService } from 'src/app/shared/services/data-store-services/invoice-items-store.service';
import { PasspartuColorDataStoreService } from 'src/app/shared/services/data-store-services/passpartu-color-data-store.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

@Component({
  selector: 'app-framing',
  templateUrl: './framing.component.html',
  styleUrls: ['./framing.component.scss'],
  providers: [SelectionComponentService],
})
export class FramingComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionManager();

  isEdit: boolean = false;

  currency: string;

  @ViewChild('stepper') stepper;
  dimensionsInputAttributeForm!: FormGroup;

  invoiceOid: string | undefined;

  invoiceItem: InvoiceItemModel = {
    oid: '',
    count: 1,
    dimensions: { width: 20, height: 30, uom: UOM.CENTIMETER },
    selectedFrames: [],
  };

  constructor(
    private route: Router,
    private _activeRoute: ActivatedRoute,
    private selectPopUp: SelectionComponentService,
    private glassStoreService: GlassDataStoreService,
    private passpartuColorStoreService: PasspartuColorDataStoreService,
    private frameStoreService: FrameDataStoreService,
    private draftInvoicesStoreService: DraftInvoicesService,
    private appSettingsService: AppSettingsService
  ) {}

  get countControl(): AbstractControl | null {
    return this.dimensionsInputAttributeForm.get('count');
  }

  get widthControl(): AbstractControl | null {
    return this.dimensionsInputAttributeForm.get('width');
  }

  get heightControl(): AbstractControl | null {
    return this.dimensionsInputAttributeForm.get('height');
  }

  ngOnInit(): void {
    this.subs.sink = this.appSettingsService.settings.subscribe((settings) => {
      this.currency = settings.formatSettings.currencyDisplayValue;
    });
    this.dimensionsInputAttributeForm = new FormGroup({
      count: new FormControl(this.invoiceItem.count, [
        Validators.required,
        Validators.min(1),
      ]),
      width: new FormControl(this.invoiceItem.dimensions.width, [
        Validators.required,
        Validators.min(1),
      ]),
      height: new FormControl(this.invoiceItem.dimensions.height, [
        Validators.required,
        Validators.min(1),
      ]),
    });
    this.invoiceOid = this._activeRoute.snapshot.paramMap.get('invoiceOid');
    const oid = this._activeRoute.snapshot.paramMap.get('invoiceItemOid');

    if (this.invoiceOid) {
      this.draftInvoicesStoreService.draftInvoices.subscribe((invoices) => {
        let inv = invoices.filter((i) => i.oid === this.invoiceOid)[0];
        this.invoiceOid = inv.oid;
        if (oid) {
          this.invoiceItem = inv.invoiceItems.filter((ii) => ii.oid === oid)[0];
        }
      });
    }
  }

  selectGlass(): void {
    this.subs.sink.selectGlass = this.glassStoreService.entities.subscribe(
      (glasses) => {
        // TODO map glasses to needed entity...
        this.subs.sink.selectGlassPopUp = this.selectPopUp
          .openDialog(
            glasses.map((glass) => {
              return {
                oid: glass.oid,
                name: glass.name,
                pricePerUom: glass.pricePerUom,
                uom: glass.uom,
                cashRegisterNumber: glass.cashRegisterNumber,
                selected: this.invoiceItem?.glass?.oid === glass.oid,
                thumbnailUrl: Constants.THUMBNAIL_GLASS,
              };
            })
          )
          .subscribe((oid: string) => {
            if (oid) {
              this.invoiceItem.glass = glasses.filter((g) => g.oid === oid)[0];
            }
          });
      }
    );
  }

  selectPasspartu(): void {
    this.subs.sink.selectPasspartu =
      this.passpartuColorStoreService.entities.subscribe((passpartues) => {
        this.subs.sink.selectPasspartuPopUp = this.selectPopUp
          .openDialog(
            passpartues.map((passpartu) => {
              return {
                oid: passpartu.oid,
                name: passpartu.name,
                pricePerUom: passpartu.passpartu.pricePerUom,
                uom: passpartu.passpartu.uom,
                cashRegisterNumber: passpartu.passpartu.cashRegisterNumber,
                selected:
                  this.invoiceItem?.passpartu?.value?.oid === passpartu.oid,
                thumbnailUrl: Constants.THUMBNAIL_PASSPARTU,
              };
            })
          )
          .subscribe((oid: string) => {
            if (oid) {
              this.invoiceItem.passpartu = {
                value: passpartues.filter((g) => g.oid === oid)[0],
              };
              this.selectPasspartuWidth();
            }
          });
      });
  }

  selectPasspartuWidth(): void {
    // TODO
    this.invoiceItem.passpartu.width = 30;
  }

  selectMirror(): void {
    // TODO
  }

  removeFromInvoiceItem(type: 'glass' | 'passpartu' | 'mirror'): void {
    switch (type) {
      case 'glass':
        this.invoiceItem.glass = undefined;
        break;
      case 'passpartu':
        this.invoiceItem.passpartu = undefined;
        break;
      case 'mirror':
        this.invoiceItem.mirror = undefined;
        break;
    }
  }

  addNewFrameToInvoiceItem(): void {
    this.subs.sink.addNewFrameToInvoice =
      this.frameStoreService.entities.subscribe((frames) => {
        this.subs.sink.frameSelectPopUp = this.selectPopUp
          .openDialog(
            frames.map((frame) => {
              return {
                oid: frame.oid,
                name: frame.name,
                pricePerUom: frame.pricePerUom,
                uom: frame.uom,
                frameWidthMM: frame.frameWidthMM,
                cashRegisterNumber: frame.cashRegisterNumber,
                selected:
                  this.invoiceItem.selectedFrames.filter(
                    (f) => f.oid === frame.oid
                  ).length > 0, // TODO this.invoice?.passpartu?.oid === passpartu.oid,
                thumbnailUrl: Constants.THUMBNAIL_FRAME,
              };
            })
          )
          .subscribe((oid: string) => {
            if (oid) {
              this.invoiceItem.selectedFrames.push(
                frames.filter((g) => g.oid === oid)[0]
              );
            }
          });
      });
  }

  removeAddedFrame(index: number): void {
    this.invoiceItem.selectedFrames.splice(index, 1);
  }

  cancel(): void {
    this.route.navigate(['/']);
  }

  finish(): void {
    if (this.isEdit) {
      this.draftInvoicesStoreService.editDraftInvoiceItem(
        this.invoiceOid,
        this.invoiceItem
      );
      this.route.navigate(['invoice-create-edit', 'edit', this.invoiceOid]);
    } else {
      let newOid = this.draftInvoicesStoreService.addNewInvoiceItem(
        this.invoiceItem,
        this.invoiceOid
      );
      this.route.navigate(['invoice-create-edit', 'edit', newOid]);
    }
  }

  // On tab index change set previous step form as touched
  markFormAsTouched(changeObj: StepperSelectionEvent): void {
    changeObj.previouslySelectedStep.stepControl?.markAllAsTouched();
  }

  checkStepBeforeSwitch(switchedTo: number): void {
    console.log(switchedTo);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
