import { Observable } from 'rxjs';
import * as tinymce from 'tinymce';

import { Injectable } from '@angular/core';
import { angular } from 'core/angular-utils';
import { HttpService } from '@service/http.service';
import { UtilService } from '@service/util.service';
import { WebBaseService } from '@web-class';
import { AttributeService } from '../utils/service';
@Injectable({
    providedIn: 'root'
})
export class FormBuilderService extends WebBaseService {
    constructor(
        utilService: UtilService,
        public httpService: HttpService,
        private attributeService: AttributeService
    ) {
        super(utilService);
    }
    controlTitleLang = {};
    editFlowForm(formId, formName, formType, formSort, formContent, fieldCounter, controlTitleLang, transformList, editor?): Observable<any> {
        const controls = {};
        // 这个地方需要修改
        jQuery(formContent).find('[data-efb-control]').each(function () {
            const $this = jQuery(this),
                id = $this.attr('id'),
                type = $this.attr('data-efb-control'),
                title = $this.attr('title'),
                attributes = {};
            if ($this.parents('div#sel-mce_0').html()) {
                return false;
            }
            jQuery.each($this[0]['attributes'], function (index, attr) {

                attributes[attr.name] = attr.value;

            });
            controls[id] = {
                'type': type,
                'title': title,
                'attribute': attributes
            };

            // 明细字段
            if (type === 'detail-layout') {
                const parsedLayoutInfo = {},
                    layoutInfo = $this.attr('data-efb-layout-info'),
                    parsedInfo = angular.fromJson(layoutInfo || '[]');
                for (let j = 0, layoutLength = parsedInfo['length'] || 0; j < layoutLength; j++) {
                    const childType = parsedInfo[j]['type'];

                    parsedLayoutInfo[parsedInfo[j]['id']] = {
                        'type': childType,
                        'title': parsedInfo[j]['title'],
                        'attribute': parsedInfo[j]
                    };
                    // if(parsedInfo[j].isAmount !== true && detailLayoutAmountArray.indexOf(parsedInfo[j].id) != -1){
                    //     transformList.delete.push(parsedInfo[j].id);
                    // }
                }
                controls[id]['info'] = parsedLayoutInfo;
            }
        });
        this.attributeService.controls = controls;
        const data = {
            'form_name': formName,
            'control_title_lang': this.controlTitleLang,
            'print_model': formContent,
            'field_counter': fieldCounter,
            'control': controls,
            'form_type': formType,
            'change': transformList,
            'form_sort': formSort
        };

        const observable = new Observable((observer) => {
            this.httpService.sendRequest('api/flow/flow-define/flow-form/' + formId, {
                method: 'POST',
                data: data
            }, true).subscribe(() => {
                observer.next();
            });
        });
        return observable;
    }

    getDetailFlowForm(id, params) {
        return this.httpService.sendRequest('api/flow/flow-define/flow-form/' + id, {
            method: 'GET',
            params: params
        }, true);
    }
    /**
     * 解析表单
     * @param  {[type]} formContent [description]
     * @return {[type]}             [description]
     */
    analyzeForm(formContent) {

        // 黑科技 效果还不错
        jQuery('body').append('<div style="display:none;" id="form-temp-container">' + formContent + '</div>');

        const controls = [];
        jQuery('#form-temp-container').find('[data-efb-control]').each(() => {
            const $this = jQuery(this),
                attributes = {};

            jQuery.each($this.get(0)['attributes'], (key, value) => {

                // 明细布局控件 解析出子控件
                if (value.name === 'data-efb-layout-info') {
                    attributes[value.name] = angular.fromJson(value.value);
                } else {
                    attributes[value.name] = value.value;
                }
            });

            controls.push(attributes);
        });

        jQuery('body').find('#form-temp-container').remove();

        return controls;
    }
    // 获取收藏的控件
    getCollectionControl() {
        return this.httpService.sendRequest('api/flow/control/get-control-list', {
            method: 'get'
        }).then(response => {
            if (response && response.data) {
                return response.data;
            }
            return '';
        }, _ => {
            return '';
        });
    }
    saveCollectionControl(data) {
        return this.httpService.sendRequest('api/flow/control/save-control-collection', {
            method: 'post',
            data: data
        }).then(response => {
            return response;
        }, error => {
            return error;
        });
    }
    controlList() {
        return [
            {
                id: '1',
                key: 'detail-layout',
                title: '明细布局',
                type: 'layout'
            }, {
                id: '2',
                key: 'horizontal-layout',
                title: '水平布局',
                type: 'layout'
            }, {
                id: '3',
                key: 'vertical-layout',
                title: '垂直布局',
                type: 'layout'
            },
            {
                id: '4',
                key: 'text',
                title: '单行文本框',
                type: 'base'
            }, {
                id: '5',
                key: 'textarea',
                title: '多行文本框',
                type: 'base'
            }, {
                id: '6',
                key: 'radio',
                title: '单选框',
                type: 'base'
            }, {
                id: '7',
                key: 'checkbox',
                title: '复选框',
                type: 'base'
            }, {
                id: '8',
                key: 'select',
                title: '下拉框',
                type: 'base'
            }, {
                id: '9',
                key: 'label',
                title: '描述',
                type: 'base'
            }, {
                id: '10',
                key: 'editor',
                title: '编辑器',
                type: 'senior'
            }, {
                id: '11',
                key: 'data-selector',
                title: '系统数据',
                type: 'senior'
            }, {
                id: '12',
                key: 'signature-picture',
                title: '签名图片',
                type: 'senior'
            }, {
                id: '13',
                key: 'upload',
                title: '附件上传',
                type: 'senior'
            }, {
                id: '14',
                key: 'countersign',
                title: '会签控件',
                type: 'senior'
            }, {
                id: '15',
                key: 'dynamic-info',
                title: '动态信息',
                type: 'senior'
            }, {
                id: '16',
                key: 'electronic-signature',
                title: '电子签章',
                type: 'senior'
            }, {
                id: '17',
                key: 'barcode',
                title: '条码控件',
                type: 'senior'
            },
        ];
    }

    availAttribute() {
        return [
            'data-efb-border-type',
            'data-efb-format',
            'data-efb-source',
            'data-efb-source-value',
            'data-efb-options',
            'data-efb-selected-options',
            'data-efb-data-selector-category',
            'data-efb-data-selector-type',
            '"data-efb-data-selector-mode"',
            'data-efb-datetime-calculate',
            'data-efb-width',
            'data-efb-height',
            'data-efb-min-height',
            'data-efb-max-height',
            'data-efb-is-current',
            'data-efb-allow-set-style',
            'data-efb-allow-hide-user-name',
            'data-efb-allow-hide-department',
            'data-efb-allow-hide-user-img',
            'data-efb-allow-hide-time',
            'data-efb-use-default',
            'data-efb-cover-countersign',
            'data-efb-sort-by',
            'data-efb-order-by',
            'data-efb-image-width',
            'data-efb-image-height',
            'data-efb-data-selector-mode',
            'data-efb-orientation',
            'data-efb-decimal-places',
            'data-efb-decimal-places-digit',
            'data-efb-layout-max-rows',
            'data-efb-upload-method',
            'data-efb-only-image',
            'data-efb-file-count',
            'data-efb-queue-style',
            'data-efb-file-size',
            'data-efb-btn-text',
            'data-efb-amount-in-words',
            'data-efb-readonly',
            'data-efb-add-rows',
            'data-efb-init-rows',
            'data-efb-is-show-number',
            'data-efb-is-adaption',
            'data-efb-thousand-separator',
            'data-efb-title-align',
            'data-efb-display-form',
            'data-efb-selector-mode',
            'data-efb-multiple',
            'data-efb-allow-hide-userimg',
            'data-efb-allow-hide-username',
            'data-efb-rounding',
            'data-efb-validate-reg-exp',
            // 新增
            'data-efb-default',
            'data-efb-readonly',
            'data-efb-placeholder-type',
            'data-efb-placeholder',
            'data-efb-percentage',
            'data-efb-data-selector-default-value',
            'data-efb-data-selector-default',
            // 动态信息数据源
            'data-efb-dynamic-layout-info',
            'data-efb-layout-max-rows',
            'data-efb-conditions',
            'data-efb-data-selector-category',
            'data-efb-url',
            'data-efb-hide-file-name',
            'data-efb-layout-info',
            // 附件模版
            'data-efb-attachment-template',
            // 条码控件
            'data-efb-code-type',
            'data-efb-bar-code-type',
            'data-efb-encode-type',
            'data-efb-encode-rule',
            'data-efb-encode-type-value',
            'class',
            'data-efb-control-name',
            'data-efb-encode-length',
            'data-efb-hide-text',
            // 9.1是否包含离职人员
            'data-efb-is-include-leave',
            // 9.23增加隐藏属性
            'data-efb-hide'
        ];
    }

    typeList() {
        return {
            'detail-layout': this.trans('formParse.detail_layout'),
            'horizontal-layout': this.trans('formParse.horizontal_layout'),
            'vertical-layout': this.trans('formParse.vertical_layout'),
            'text': this.trans('formParse.input'),
            'textarea': this.trans('formParse.multiline_text_box'),
            'radio': this.trans('formParse.radio'),
            'checkbox': this.trans('formParse.check_box'),
            'select': this.trans('formParse.dropdown_box'),
            'label': this.trans('formParse.describe'),
            'editor': this.trans('formParse.editor'),
            'data-selector': this.trans('formParse.system_data'),
            'signature-picture': this.trans('formParse.signature_picture'),
            'upload': this.trans('formParse.attachments_upload'),
            'countersign': this.trans('formParse.countersign_control'),
            'dynamic-info': this.trans('formParse.dynamic_information'),
            'electronic-signature': this.trans('formParse.electronic_signature'),
            'barcode': this.trans('flow.barcode_control'),
        };
    }
}
