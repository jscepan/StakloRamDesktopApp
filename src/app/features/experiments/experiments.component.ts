import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.scss'],
})
export class ExperimentsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  idiNa(gde: string) {
    this.router.navigate([gde]);
  }
}
