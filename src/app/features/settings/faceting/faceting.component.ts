import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faceting',
  templateUrl: './faceting.component.html',
  styleUrls: ['./faceting.component.scss'],
})
export class FacetingComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
