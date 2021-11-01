import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sandblasting',
  templateUrl: './sandblasting.component.html',
  styleUrls: ['./sandblasting.component.scss'],
})
export class SandblastingComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
