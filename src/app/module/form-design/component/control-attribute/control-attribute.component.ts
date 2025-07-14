import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ControlAttributeService } from './control-attribute.service';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from '../../utils/template/template.component';

@Component({
  standalone: true,
  selector: 'form-control-attribute',
  templateUrl: './control-attribute.component.html',
  styleUrls: ['./control-attribute.component.scss'],
  imports: [
    CommonModule,
    TemplateComponent,
  ],
})
export class ControlAttributeComponent implements OnInit {
  private _attributes;
  @Input() set attributes(value) {
    this._attributes = value || {};
  };
  get attributes() {
    return this._attributes || {};
  }
  @Input() attributeValue;

  constructor(
    private changeRef: ChangeDetectorRef,
    private controlAttributeService: ControlAttributeService,
  ) { }

  private subscriptionList = [];

  ngOnInit() {
    this.subscriptionList['setAttributs'] = this.controlAttributeService.setAttributes$.subscribe(data => {
      this.attributes = data;
      this.changeRef.detectChanges();
    })
    this.subscriptionList['setAttributeValue'] = this.controlAttributeService.setAttributeValue$.subscribe(data => {
      if (data) {
        this.attributeValue = data;
        this.changeRef.detectChanges();
      }
    })
  }

}
