import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectionComponentService } from '@features/selection-popup/selection-component.service';
import { Constants } from 'src/app/shared/constants';
import { UOM } from 'src/app/shared/enums/uom-enum';
import { ProductModel } from 'src/app/shared/models/product-model';
import { GlassDataStoreService } from 'src/app/shared/services/data-store-services/glass-data-store.service';
import { SubscriptionManager } from 'src/app/shared/services/subscription.manager';

@Component({
  selector: 'app-framing',
  templateUrl: './framing.component.html',
  styleUrls: ['./framing.component.scss'],
  providers: [SelectionComponentService],
})
export class FramingComponent implements OnInit {
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
    mirror?: ProductModel;
  } = {
    count: 555,
    width: 999,
    height: 111,
    uom: UOM.CENTIMETER,
  };
  constructor(
    private route: Router,
    private selectPopUp: SelectionComponentService,
    private glassStoreService: GlassDataStoreService
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
      count: new FormControl(this.invoice.count, []),
      width: new FormControl(this.invoice.width, []),
      height: new FormControl(this.invoice.height, []),
    });
    setTimeout(() => {
      this.selectGlass();
    }, 100);
  }

  selectGlass(): void {
    this.subs.sink.selectGlass = this.glassStoreService.entities.subscribe(
      (glasses) => {
        // TODO map glasses to needed entity...
        this.subs.sink = this.selectPopUp
          .openDialog(
            glasses.map((glass) => {
              return {
                oid: glass.oid,
                name: glass.name,
                pricePerUom: glass.pricePerUom,
                cashRegisterNumber: glass.cashRegisterNumber,
                uom: glass.uom,
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

  selectPasspartu(): void {}

  selectMirror(): void {}

  cancel(): void {
    this.route.navigate(['/']);
  }

  nextStep(): void {}

  previousStep(): void {}

  finishStep(): void {}

  // On tab index change set previous step form as touched
  markFormAsTouched(changeObj: StepperSelectionEvent): void {
    changeObj.previouslySelectedStep.stepControl?.markAllAsTouched();
  }

  checkStepBeforeSwitch(switchedTo: number): void {
    console.log(switchedTo);
  }
}
