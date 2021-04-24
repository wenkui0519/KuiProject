import {
    ChangeDetectorRef, Component, Input, OnInit
} from '@angular/core';

import { angular } from 'src/app/core/angular-utils';
import { AttributeService } from '../../service/attribute.service';
import { ControlConfigService } from '../../service/control-config.service';


@Component({
    selector: 'control-width',
    templateUrl: './width.component.html',
    styleUrls: ['./width.component.scss']
})
export class WidthComponent implements OnInit {
    private _attribute;
    @Input() set attribute(value) {
        this._attribute = value;
        if (value) {
            const efbWidth = this.attributeService.get(value, 'data-efb-width');
            const type = this.attributeService.get(value, 'data-efb-control');
            if (type) {
                this.defaultWidth = this.controlService.controlList()[type].default.width;
            } else {
                this.defaultWidth = '';
            }
            const widthData = this.attributeService.get(value, 'width', 'style');
            const style = angular.isDefined(value['attr']) && value['attr']('style');

            if (efbWidth) {
                this.width = efbWidth;
            } else {
                // 如果style中有宽度，就用widthData，否则用默认的width，因为默认宽度是100%时，widthData并不是100%
                if (style && style.indexOf('width') !== -1) {
                    this.width = widthData;
                } else {
                    this.width = this.defaultWidth;
                }
            }
        }
    }
    get attribute() {
        return this._attribute;
    }

    public width: string;
    constructor(
        public ref: ChangeDetectorRef,
        public attributeService: AttributeService,
        private controlService: ControlConfigService,
    ) {
    }
    private defaultWidth;

    ngOnInit() {

    }

    public setAutoWidth() {
        this.width = '100%';
        this.attributeService.set(this.attribute, 'width', '100%', 'style');
        this.attributeService.set(this.attribute, 'data-efb-width', '100%');
    }

    public changeWidth(value) {
        if (value.indexOf('px') == -1 && value.indexOf('%') == -1) {
            value = value ? value + 'px' : this.defaultWidth;
        }
        this.attributeService.set(this.attribute, 'data-efb-width', value);
        this.attributeService.set(this.attribute, 'width', value, 'style');
    }
}
