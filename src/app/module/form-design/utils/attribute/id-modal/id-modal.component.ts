import { Component, Input, OnInit } from '@angular/core';
import { angular } from 'src/app/core/angular-utils'
// import { ModalService } from 'src/app/shared/component/modal/modal.service';
import { AttributeService } from '../../service/attribute.service';

@Component({
    selector: 'app-id-modal',
    templateUrl: './id-modal.component.html',
    styleUrls: ['./id-modal.component.scss']
})
export class IdModalComponent implements OnInit {
    constructor(
        // private modalService: ModalService,
        private attributeService: AttributeService,
    ) { }

    private _id;
    @Input() set id(value) {
        this._id = value || '';
    };
    get id() {
        return this._id;
    }
    public currentId: any;

    ngOnInit() {
        this.currentId = this.id
    }
    ok() {
        if (this.currentId == '' || $.trim(this.currentId) === '') {
            alert('控件ID不能为空');
            return false;
        }
        let flag = false;
        // 拿到所有控件列表
        const controlList = this.attributeService.getParentControls('', 'all');
        if (controlList && controlList.length > 0) {
            angular.forEach(controlList, data => {
                if (this.currentId !== this.id && data.id === 'DATA_' + this.currentId) {
                    flag = true;
                }
            });
        }
        if (flag) {
            alert('此控件ID已被占用，请重新设置');
            return false;
        }
        // this.modalService.ok(this.currentId);
    }

}
