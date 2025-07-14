import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'form-control-list',
  templateUrl: './control-list.component.html',
  styleUrls: ['./control-list.component.scss'],
  imports: [
    CommonModule,
  ]
})
export class ControlListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
