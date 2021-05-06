import { angular } from 'src/app/core/angular-utils'

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { AttributeService } from '../../service/attribute.service';

@Component({
    selector: 'control-border',
    templateUrl: './border.component.html',
    styleUrls: ['./border.component.scss']
})
export class BorderComponent implements OnInit {

    attribute: any;
    constructor(
        public attributeService: AttributeService,
        public ref: ChangeDetectorRef,
    ) {
    }

    public borderType: string;
    public borderColor = '#dcdcdc';
    public borderList: any[] = [];
    public currentBorder = {
        'width': '1',
        'style': 'solid',
    };
    ngOnInit() {
        const borderType = this.attributeService.get(this.attribute, 'data-efb-border-type'),
            borderAttr = borderType === 'bottom' ? 'border-bottom-' : 'border-';

        let borderStyle = this.attributeService.get(this.attribute, borderAttr + 'style', 'style');

        let borderWidth = this.attributeService.get(this.attribute, borderAttr + 'width', 'style');

        if (!borderStyle) {
            borderStyle = this.attributeService.get(this.attribute, borderAttr + 'style') || this.attributeService.get(this.attribute, 'border-style');
        }
        if (!borderWidth) {
            borderWidth = this.attributeService.get(this.attribute, borderAttr + 'width') || this.attributeService.get(this.attribute, 'border-width');
        }
        // border: 1px solid #ff0000;明细字段拿不到borderStyle、borderColor、borderWidth
        if (!borderStyle || !borderWidth) {
            let border;
            if (borderType === 'bottom') {
                border = this.attributeService.get(this.attribute, 'border-bottom', 'style');
            } else {
                border = this.attributeService.get(this.attribute, 'border', 'style');
            }
            if (border) {
                if (!borderStyle) {
                    angular.forEach(['solid', 'dotted', 'dashed'], data => {
                        if (border.indexOf(data) !== -1) {
                            borderStyle = data;
                        }
                    });
                }
                borderStyle = borderStyle || 'solid';
                if (!borderWidth || borderWidth == 0) {
                    angular.forEach(['1px', '2px', '3px'], data => {
                        if (border.indexOf(data) !== -1) {
                            borderWidth = data;
                        }
                    });
                }
            }

        }
        this.borderType = borderType ? borderType : 'all';
        // 去掉px
        borderWidth = borderWidth ? borderWidth.replace(/0px/g, '').replace(/(^\s*)|(\s*$)/g, '').replace(/px$/, '') : '1';

        this.currentBorder = {
            width: borderWidth,
            style: borderStyle
        };

        const borderStyleArray = ['solid', 'dashed', 'dotted'];

        for (let i = 0, borderStyleLength = borderStyleArray.length; i < borderStyleLength; i++) {
            for (let j = 1; j <= 3; j++) {
                this.borderList.push({
                    width: j,
                    style: borderStyleArray[i]
                });
            }
        }
    }

    public changeBorder(borderInfo?) {
        if (borderInfo) {
            this.currentBorder = borderInfo;
        }
        this.attributeService.set(this.attribute, 'data-efb-border-type', this.borderType);
        if (this.borderType === 'none') {
            // this.attributeService.set(this.attribute, 'border', 'none', 'style');
            // this.attributeService.set(this.attribute, 'border-bottom', 'none', 'style');
            // 为了能正确获取边框的默认样式设置的颜色，当无边框时，只设置border-width为0便可
            this.attributeService.set(this.attribute, 'border-width', '0', 'style');
            this.attributeService.set(this.attribute, 'border-bottom-width', '0', 'style');
        } else {
            this.attributeService.remove(this.attribute, 'border-width');
            this.attributeService.remove(this.attribute, 'border-bottom-width');
            if (this.currentBorder.style === 'none' || this.currentBorder.style === '') {
                this.currentBorder.style = 'solid';
            }
            if (!this.currentBorder.width || this.currentBorder.width == '0') {
                this.currentBorder.width = '1';
            }
            const borderType = this.borderType === 'bottom' ? 'border-bottom' : 'border';
            this.attributeService.set(this.attribute, 'border', '0px ' + this.currentBorder.style + ' ' + this.borderColor, 'style');
            this.attributeService.set(this.attribute, 'border-bottom', this.currentBorder.width + 'px ' + this.currentBorder.style + ' ' + this.borderColor, 'style');
            this.attributeService.set(this.attribute, borderType, this.currentBorder.width + 'px ' + this.currentBorder.style + ' ' + this.borderColor, 'style');
        }
        if (!this.ref.detectChanges['destroyed']) {
            this.ref.detectChanges();
        }

    }

    onChangeColor(): void {
        // 更新视图和子视图，这样才能让颜色选择器也跟着更新
        // 因为表单更新策略的关系，这边要使用detectChanges
        this.ref.detectChanges();
    }
}
