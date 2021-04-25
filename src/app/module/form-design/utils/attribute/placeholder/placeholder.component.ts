import { Component, Input, OnInit } from '@angular/core';
import { angular } from 'src/app/core/angular-utils';
import { AttributeService } from '../../service/attribute.service';
import { ControlConfigService } from '../../service/control-config.service';

@Component({
    selector: 'control-placeholder',
    templateUrl: './placeholder.component.html',
    styleUrls: ['./placeholder.component.scss']
})
export class PlaceholderComponent implements OnInit {
    private _attribute
    @Input() set attribute(value){
        if(value){
            this._attribute = value;
            this.placeholder = this.attributeService.get(this.attribute,'data-ebf-placeholder');
        }
    };
    get attribute(){
        return this._attribute;
    }
    public placeholder;

    constructor(
        private attributeService:AttributeService,
    ) { }

    ngOnInit() {
    }

    changePlaceholder(value) {
        this.attributeService.set(this.attribute,'data-ebf-placeholder',value)
    }

}
