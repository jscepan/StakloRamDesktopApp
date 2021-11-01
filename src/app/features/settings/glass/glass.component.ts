import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-glass',
  templateUrl: './glass.component.html',
  styleUrls: ['./glass.component.scss'],
})
export class GlassComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
