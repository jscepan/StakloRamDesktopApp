import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SelectionComponentService } from '@features/selection-popup/selection-component.service';
import { Constants } from 'src/app/shared/constants';
import { UOM } from 'src/app/shared/enums/uom-enum';
import { FrameModel } from 'src/app/shared/models/frame-model';
import { ProductModel } from 'src/app/shared/models/product-model';
import { FrameDataStoreService } from 'src/app/shared/services/data-store-services/frame-data-store.service';
import { GlassDataStoreService } from 'src/app/shared/services/data-store-services/glass-data-store.service';
import { PasspartuDataStoreService } from 'src/app/shared/services/data-store-services/passpartu-data-store.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

@Component({
  selector: 'app-framing',
  templateUrl: './framing.component.html',
  styleUrls: ['./framing.component.scss'],
  providers: [SelectionComponentService],
})
export class FramingComponent implements OnInit, OnDestroy {
  private subs = new SubscriptionManager();

  @ViewChild('stepper') stepper;
  dimensionsInputAttributeForm!: FormGroup;

  invoice: {
    count: number;
    width: number;
    height: number;
    uom: UOM;
    glass?: ProductModel;
    passpartu?: ProductModel;
    passpartuWidth?: number;
    mirror?: ProductModel;
    selectedFrames?: FrameModel[];
  } = {
    count: 1,
    width: 20,
    height: 30,
    uom: UOM.CENTIMETER,
    selectedFrames: [],
  };
  constructor(
    private route: Router,
    private selectPopUp: SelectionComponentService,
    private glassStoreService: GlassDataStoreService,
    private passpartuStoreService: PasspartuDataStoreService,
    private frameStoreService: FrameDataStoreService
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
    this.dimensionsInputAttributeForm = new FormGroup({
      count: new FormControl(this.invoice.count, [
        Validators.required,
        Validators.min(1),
      ]),
      width: new FormControl(this.invoice.width, [
        Validators.required,
        Validators.min(1),
      ]),
      height: new FormControl(this.invoice.height, [
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
                selected: this.invoice?.glass?.oid === glass.oid,
                thumbnailUrl: Constants.THUMBNAIL_GLASS,
              };
            })
          )
          .subscribe((oid: string) => {
            if (oid) {
              this.invoice.glass = glasses.filter((g) => g.oid === oid)[0];
            }
          });
      }
    );
  }

  selectPasspartu(): void {
    this.subs.sink.selectPasspartu =
      this.passpartuStoreService.entities.subscribe((passpartues) => {
        this.subs.sink.selectPasspartuPopUp = this.selectPopUp
          .openDialog(
            passpartues.map((passpartu) => {
              return {
                oid: passpartu.oid,
                name: passpartu.name,
                pricePerUom: passpartu.pricePerUom,
                uom: passpartu.uom,
                cashRegisterNumber: passpartu.cashRegisterNumber,
                selected: this.invoice?.passpartu?.oid === passpartu.oid,
                thumbnailUrl: Constants.THUMBNAIL_PASSPARTU,
              };
            })
          )
          .subscribe((oid: string) => {
            if (oid) {
              this.invoice.passpartu = passpartues.filter(
                (g) => g.oid === oid
              )[0];
            }
            this.selectPasspartuWidth();
          });
      });
  }

  selectPasspartuWidth(): void {
    // TODO
    this.invoice.passpartuWidth = 30;
  }

  selectMirror(): void {
    // TODO
  }

  addNewFrameToInvoice(): void {
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
                  this.invoice.selectedFrames.filter((f) => f.oid === frame.oid)
                    .length > 0, // TODO this.invoice?.passpartu?.oid === passpartu.oid,
                thumbnailUrl: Constants.THUMBNAIL_FRAME,
              };
            })
          )
          .subscribe((oid: string) => {
            if (oid) {
              this.invoice.selectedFrames.push(
                frames.filter((g) => g.oid === oid)[0]
              );
            }
          });
      });
  }

  changeAddedFrame(frame: FrameModel, index: number): void {
    this.subs.sink.changeAddedFrame = this.frameStoreService.entities.subscribe(
      (frames) => {
        this.subs.sink.frameEditSelectPopUp = this.selectPopUp
          .openDialog(
            frames.map((frame) => {
              return {
                oid: frame.oid,
                name: frame.name,
                pricePerUom: frame.pricePerUom,
                uom: frame.uom,
                frameWidthMM: frame.frameWidthMM,
                cashRegisterNumber: frame.cashRegisterNumber,
                selected: this.invoice.selectedFrames[index].oid === frame.oid, //                  this.invoice.selectedFrames.filter((f) => f.oid === frame.oid).length > 0, // TODO this.invoice?.passpartu?.oid === passpartu.oid,
                thumbnailUrl: Constants.THUMBNAIL_FRAME,
              };
            })
          )
          .subscribe((oid: string) => {
            if (oid) {
              this.invoice.selectedFrames[index] = frames.filter(
                (g) => g.oid === oid
              )[0];
            }
          });
      }
    );
  }

  removeAddedFrame(index: number): void {
    this.invoice.selectedFrames.splice(index, 1);
  }

  cancel(): void {
    this.route.navigate(['/']);
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
