import { Component, Input, OnInit } from '@angular/core';
import { AppSettingsService } from 'src/app/shared/services/app-settings.service';
import { InvoiceItemModel } from '../../models/invoice-item.model';

@Component({
  selector: 'app-framing-description',
  templateUrl: './framing-description.component.html',
  styleUrls: ['./framing-description.component.scss'],
})
export class FramingDescriptionComponent implements OnInit {
  @Input() dataModel: InvoiceItemModel;
  @Input() inOneRow: boolean = false;

  constructor(private constantsService: AppSettingsService) {}

  ngOnInit(): void {
    console.log('this.dataModel');
    console.log(this.dataModel);
  }
}
