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
import { TranslateService } from '@ngx-translate/core';
import { KeyboardAlphabetComponentService } from 'src/app/shared/components/keyboard/alphabet/keyboard-alphabet.component.service';
import { KeyboardNumericComponentService } from 'src/app/shared/components/keyboard/numeric/keyboard-numeric.component.service';
import { MODE } from 'src/app/shared/components/me-basic-alert/me-basic-alert.interface';
import { Constants } from 'src/app/shared/constants';
import { UOM } from 'src/app/shared/enums/uom-enum';
import { InvoiceItemModel } from 'src/app/shared/models/invoice-item.model';
import { AppSettingsService } from 'src/app/shared/services/app-settings.service';
import { FrameDataStoreService } from 'src/app/shared/services/data-store-services/frame-data-store.service';
import { GlassDataStoreService } from 'src/app/shared/services/data-store-services/glass-data-store.service';
import { DraftInvoicesService } from 'src/app/shared/services/data-store-services/invoice-items-store.service';
import { MirrorDataStoreService } from 'src/app/shared/services/data-store-services/mirror-data-store.service';
import { PasspartuColorDataStoreService } from 'src/app/shared/services/data-store-services/passpartu-color-data-store.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';
import { FacetingSandingPopupService } from './faceting-sanding-selection-popup/faceting-sanding-popup-component.service';
import { InvoiceItemAmountCalculatorService } from './invoice-item-amount-calculator.service';

@Component({
  selector: 'app-framing',
  templateUrl: './framing.component.html',
  styleUrls: ['./framing.component.scss'],
  providers: [
    SelectionComponentService,
    InvoiceItemAmountCalculatorService,
    FacetingSandingPopupService,
    KeyboardNumericComponentService,
    KeyboardAlphabetComponentService,
  ],
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
    itemTitle: '',
    dimensions: { width: 20, height: 30, uom: UOM.CENTIMETER },
    selectedFrames: [],
    amount: 0,
  };

  constructor(
    private route: Router,
    private _activeRoute: ActivatedRoute,
    private selectPopUp: SelectionComponentService,
    private glassStoreService: GlassDataStoreService,
    private passpartuColorStoreService: PasspartuColorDataStoreService,
    private frameStoreService: FrameDataStoreService,
    private mirrorStoreService: MirrorDataStoreService,
    private draftInvoicesStoreService: DraftInvoicesService,
    private itemAmountCalcService: InvoiceItemAmountCalculatorService,
    private facetingSandingPopupService: FacetingSandingPopupService,
    private keyboardNumericComponentService: KeyboardNumericComponentService,
    private translateService: TranslateService,
    private appSettingsService: AppSettingsService,
    private globalService: GlobalService,
    private keyboardAlphabetComponentService: KeyboardAlphabetComponentService
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
    this.invoiceItem.itemTitle = this.translateService.instant('image');
    this.subs.sink = this.appSettingsService.settings.subscribe((settings) => {
      this.currency = settings.formatSettings.currencyDisplayValue;
    });
    this.initializeForm();
    this.invoiceOid = this._activeRoute.snapshot.paramMap.get('invoiceOid');
    const oid = this._activeRoute.snapshot.paramMap.get('invoiceItemOid');

    if (this.invoiceOid) {
      this.draftInvoicesStoreService.draftInvoices.subscribe((invoices) => {
        let inv = invoices.filter((i) => i.oid === this.invoiceOid)[0];
        this.invoiceOid = inv.oid;
        if (oid) {
          this.isEdit = true;
          this.invoiceItem = inv.invoiceItems.filter((ii) => ii.oid === oid)[0];
          this.initializeForm();
        }
      });
    }
  }

  initializeForm(): void {
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
              this.invoiceItem.mirror = undefined;
              this.invoiceItem.faceting = undefined;
              this.invoiceItem.sanding = undefined;
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
              this.invoiceItem.mirror = undefined;
              this.invoiceItem.faceting = undefined;
              this.invoiceItem.sanding = undefined;
            }
          });
      });
  }

  selectPasspartuWidth(): void {
    this.subs.sink.passInputWidth = this.keyboardNumericComponentService
      .openDialog(
        this.translateService.instant('passpartuWidth'),
        UOM.CENTIMETER,
        false,
        this.translateService.instant('insertPasspartuWidth'),
        this.invoiceItem.passpartu.width || 0
      )
      .subscribe((data) => {
        if (data?.value) {
          this.invoiceItem.passpartu.width = parseFloat(data.value);
          this.invoiceItem.passpartu.widthUom = UOM.CENTIMETER;
        }
        if (!this.invoiceItem.passpartu.width) {
          this.globalService.showBasicAlert(
            MODE.error,
            this.translateService.instant('missingData'),
            this.translateService.instant('passpartuWidthIsRequiredField')
          );
          this.selectPasspartuWidth();
        }
      });
  }

  selectMirror(): void {
    this.subs.sink.selectMirror = this.mirrorStoreService.entities.subscribe(
      (mirrors) => {
        this.subs.sink.selectMirrorPopUp = this.selectPopUp
          .openDialog(
            mirrors.map((mirror) => {
              return {
                oid: mirror.oid,
                name: mirror.name,
                pricePerUom: mirror.pricePerUom,
                uom: mirror.uom,
                cashRegisterNumber: mirror.cashRegisterNumber,
                selected: this.invoiceItem?.glass?.oid === mirror.oid,
                thumbnailUrl: Constants.THUMBNAIL_MIRROR,
              };
            })
          )
          .subscribe((oid: string) => {
            if (oid) {
              this.invoiceItem.mirror = mirrors.filter((g) => g.oid === oid)[0];
              this.invoiceItem.glass = undefined;
              this.invoiceItem.passpartu = undefined;

              this.openFacetingAndSandingSelectPopup();
            }
          });
      }
    );
  }

  openFacetingAndSandingSelectPopup(): void {
    this.subs.sink.facetingAndSandingPopup = this.facetingSandingPopupService
      .openDialog(this.invoiceItem.faceting, this.invoiceItem.sanding)
      .subscribe((data) => {
        if (data) {
          this.invoiceItem.faceting = data.faceting;
          this.invoiceItem.sanding = data.sanding;
        }
      });
  }

  removeFromInvoiceItem(type: 'glass' | 'passpartu' | 'mirror'): void {
    switch (type) {
      case 'glass':
        this.invoiceItem.glass = undefined;
        break;
      case 'passpartu':
        this.invoiceItem.passpartu = undefined;
        this.dimensionsInputAttributeForm.removeControl('passpartuWidth');
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
                  ).length > 0,
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
    this.invoiceItem.count = this.dimensionsInputAttributeForm.value.count;
    this.invoiceItem.dimensions.height =
      this.dimensionsInputAttributeForm.value.height;
    this.invoiceItem.dimensions.width =
      this.dimensionsInputAttributeForm.value.width;

    this.invoiceItem.amount = this.itemAmountCalcService.getInvoiceItemAmount(
      this.invoiceItem
    );
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

  insertCount(): void {
    this.subs.sink.insertCount = this.keyboardNumericComponentService
      .openDialog(
        this.translateService.instant('insertCount'),
        UOM.PIECES,
        false,
        this.translateService.instant('countOfSameProducts'),
        this.dimensionsInputAttributeForm.get('count').value || 0
      )
      .subscribe((data) => {
        if (data?.value) {
          this.dimensionsInputAttributeForm
            .get('count')
            .setValue(parseFloat(data.value));
        }
      });
  }

  insertWidthAndHeight(): void {
    this.subs.sink.insertWidth = this.keyboardNumericComponentService
      .openDialog(
        this.translateService.instant('insertDimensions'),
        UOM.CENTIMETER,
        true,
        this.translateService.instant('insertDimensionWidth'),
        this.dimensionsInputAttributeForm.get('width').value || 0
      )
      .subscribe((data) => {
        if (data?.value) {
          this.dimensionsInputAttributeForm
            .get('width')
            .setValue(parseFloat(data.value));
        }
        if (data?.nextOperation) {
          this.insertHeight();
        }
      });
  }

  insertHeight(): void {
    this.subs.sink.insertHeight = this.keyboardNumericComponentService
      .openDialog(
        this.translateService.instant('insertDimensions'),
        UOM.CENTIMETER,
        false,
        this.translateService.instant('insertDimensionHeight'),
        this.dimensionsInputAttributeForm.get('height').value || 0
      )
      .subscribe((data) => {
        if (data?.value) {
          this.dimensionsInputAttributeForm
            .get('height')
            .setValue(parseFloat(data.value));
        }
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
