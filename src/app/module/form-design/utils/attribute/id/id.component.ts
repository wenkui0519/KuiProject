import tinymce from 'tinymce/tinymce';
import { ModalService } from 'src/app/shared/component/modal/modal.service';

import {
    ChangeDetectorRef, Component, Input, OnInit
} from '@angular/core';

import { AttributeService } from '../../service/attribute.service';
import { IdModalComponent } from '../id-modal/id-modal.component';
// import { IdModalComponent } from '../id-modal/id-modal.component';

@Component({
    selector: 'control-id',
    templateUrl: './id.component.html',
    styleUrls: ['./id.component.scss']
})
export class IdComponent implements OnInit {
    @Input() attribute: object;
    public id;

    constructor(
        private ref: ChangeDetectorRef,
        private attributeService: AttributeService,
        private modalService: ModalService,
    ) {
    }
    public currentId;
    ngOnInit() {
        this.currentId = this.attributeService.get(this.attribute, 'id', 'attribute');
        this.id = this.currentId ? this.currentId.replace('DATA_', '') : '';
    }

    openModal() {
        const params = {
            title: 'ID',
            component: IdModalComponent,
            params: {
                id: this.id
            },
            closed: (id) => {
                this.changeId(id);
            }
        }
        this.modalService.open(params);
    }

    public changeId(id) {
        this.id = id;
        const newId = 'DATA_' + id;
        this.attributeService.set(this.attribute, 'id', newId);
        if (tinymce && tinymce.activeEditor && tinymce.get('form-editor')) {
            const formContent = tinymce.activeEditor.getContent({
                format: 'raw'
            });
            tinymce.activeEditor.setContent(formContent);
        }

        this.currentId = newId;

        this.ref.detectChanges();
    }
}
