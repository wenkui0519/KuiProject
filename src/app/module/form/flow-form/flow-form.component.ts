import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactory,
    ComponentFactoryResolver, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, OnInit,
    Output, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import {
    ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators
} from '@angular/forms';
import { FormService } from './form.service';

@Component({
    selector: 'flow-form',
    templateUrl: './flow-form.component.html',
    styleUrls: ['./flow-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [FormService, {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FlowFormComponent),
        multi: true
    }]
})
export class FlowFormComponent implements OnInit {
    ngOnInit(){

    }
}
