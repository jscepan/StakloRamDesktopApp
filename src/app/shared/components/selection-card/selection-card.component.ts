import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { BaseModel } from '../../models/base-model';

@Component({
  selector: 'app-selection-card',
  templateUrl: './selection-card.component.html',
  styleUrls: ['./selection-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionCardComponent implements OnInit {
  @Input() dataModel: BaseModel;

  constructor() {}

  ngOnInit(): void {}
}
