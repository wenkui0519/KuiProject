import {
    AfterContentInit, ChangeDetectorRef, Component, ComponentFactoryResolver, Input, OnChanges,
    OnInit, SimpleChange, ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import { ATTRIBUTE } from '../attribute/attribute.config';

@Component({
    selector: 'attribute-template',
    templateUrl: './template.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, OnChanges, AfterContentInit {

    @Input('name') name: string;
    @Input('attributeValue') attributeValue: object;
    @Input('layoutInfo') layoutInfo: object[];
    @Input() collection;

    @ViewChild('seat', { read: ViewContainerRef, static: true }) seat: ViewContainerRef;

    constructor(
        public componentFactoryResolver: ComponentFactoryResolver,
        public ref: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.initAttribute();
    }
    ngOnChanges(changes: { string: SimpleChange }) {
        this.initAttribute();
    }

    ngAfterContentInit() {

    }

    public initAttribute() {
        if (!this.name) {
            return;
        }
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ATTRIBUTE[this.name]);

        this.seat.clear();

        const componentRef = this.seat.createComponent(componentFactory);

        (componentRef.instance)['attribute'] = this.attributeValue;
        (componentRef.instance)['layoutInfo'] = this.layoutInfo;
        (componentRef.instance)['collection'] = this.collection;

        this.ref.detectChanges();
    }
}
