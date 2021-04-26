import { Component, Input, OnInit } from '@angular/core';
import { angular } from 'src/app/core/angular-utils'
import { ModalService } from 'src/app/shared/component/modal/modal.service';
import { AttributeService } from '../../service/attribute.service';

@Component({
    selector: 'app-id-modal',
    templateUrl: './id-modal.component.html',
    styleUrls: ['./id-modal.component.scss']
})
export class IdModalComponent implements OnInit {
    @Input() params;
    public id: any;
    constructor(
        private modalService: ModalService,
        private attributeService:AttributeService,
    ) { }

    ngOnInit() {
        if (this.params) {
            this.id = this.params.id
        }
    }
    ok() {
        if (this.id == '' || $.trim(this.id) === '') {
            alert('控件ID不能为空');
            return false;
        }
        let flag = false;
        // const controlList = this.attributeService.getParentControls('', 'all');
        // if (controlList && controlList.length > 0) {
        //     angular.forEach(controlList, data => {
        //         if (this.params['id'] !== this.id && data.id === 'DATA_' + this.id) {
        //             flag = true;
        //         }
        //     });
        // }
        if (flag) {
            alert('此控件ID已被占用，请重新设置');
            return false;
        }
        this.modalService.ok(this.id);
    }

}
