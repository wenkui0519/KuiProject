import {
    ChangeDetectorRef, Component, Input, OnInit
} from '@angular/core';

import { angular } from 'src/app/core/angular-utils';
import { AttributeService } from '../../service/attribute.service';
import { ControlConfigService } from '../../service/control-config.service';


@Component({
    selector: 'control-height',
    templateUrl: './height.component.html',
    styleUrls: ['./height.component.scss']
})
export class HeightComponent implements OnInit {
    private _attribute;
    @Input() set attribute(value) {
        this._attribute = value;
        if (value) {
            const efbHeight = this.attributeService.get(value, 'data-efb-height');
            const type = this.attributeService.get(value, 'data-efb-control');
            if (type) {
                this.defaultHeight = this.controlService.controlList()[type].default.height;
            } else {
                this.defaultHeight = '';
            }
            const heightData = this.attributeService.get(value, 'height', 'style');
            const style = angular.isDefined(value['attr']) && value['attr']('style');

            if (efbHeight) {
                this.height = efbHeight;
            } else {
                // 如果style中有宽度，就用heightData，否则用默认的height，因为默认宽度是100%时，heightData并不是100%
                if (style && style.indexOf('height') !== -1) {
                    this.height = heightData;
                } else {
                    this.height = this.defaultHeight;
                }
            }
        }
    }
    get attribute() {
        return this._attribute;
    }

    public height: string;
    constructor(
        public ref: ChangeDetectorRef,
        public attributeService: AttributeService,
        private controlService: ControlConfigService,
    ) {
    }
    private defaultHeight;

    ngOnInit() {

    }

    public changeHeight(value) {
        if (value.indexOf('px') == -1 && value.indexOf('%') == -1) {
            value = value ? value + 'px' : this.defaultHeight;
        }
        this.attributeService.set(this.attribute, 'data-efb-height', value);
        this.attributeService.set(this.attribute, 'height', value, 'style');
    }
}
