import tinymce from 'tinymce/tinymce';

import {
    ChangeDetectorRef, Component, Input, OnInit
} from '@angular/core';

import { AttributeService } from '../../service/attribute.service';
// import { IdModalComponent } from '../id-modal/id-modal.component';

@Component({
    selector: 'control-id',
    templateUrl: './id.component.html',
    styleUrls: ['./id.component.scss']
})
export class IdComponent implements OnInit{
    @Input() attribute: object;
    public id: string;

    constructor(
        public ref: ChangeDetectorRef,
        public attributeService: AttributeService,
    ) {
    }
    public currentId: string;
    ngOnInit() {
        this.currentId = this.attributeService.get(this.attribute, 'id', 'attribute');
        this.id = this.currentId ? this.currentId.replace('DATA_', '') : '';
    }

    openModal(){

    }

    // public openModal() {
    //     const modalRef = this.euiModal.open(IdModalComponent);
    //     modalRef.componentInstance.params = {
    //         id: this.id,
    //     };

    //     modalRef.result.then((id) => {
    //         this.id = id;
    //         const newId = 'DATA_' + id;
    //         this.attributeService.set(this.attribute, 'id', newId);
    //         if (tinymce && tinymce.activeEditor && tinymce.get('form-editor')) {
    //             const formContent = tinymce.activeEditor.getContent({
    //                 format: 'raw'
    //             });
    //             tinymce.activeEditor.setContent(formContent);
    //         }

    //         this.currentId = newId;

    //         this.ref.detectChanges();
    //     });
    // }
}
