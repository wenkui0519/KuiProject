import { Injectable } from "@angular/core";
import tinymce from "tinymce";

@Injectable({
    providedIn: 'root'
})

export class AttributeService {
    constructor() { }
    public controlCount: number;

    set(element, attrName, attrValue, type?) {
        if (element instanceof jQuery) {
            switch (type) {
                case 'style':
                    element['css'](attrName, attrValue)
                    break;
                default:
                    element['attr'](attrName, attrValue);
                    break;
            }
        }
    }

    get(element, attrName, type?) {
        let result;
        if (element instanceof jQuery) {
            switch (type) {
                case 'style':
                    result = element['css'](attrName)
                    break;
                default:
                    result = element['attr'](attrName);
                    break;
            }
        }
        return result;
    }
    /**
     * 获取父级控件列表
     * @param {string} currentId 当前控件id
     * @param {string | string[]} type 需要的结果类型
     */
    getParentControls(currentId, type) {
        const self = this,
            controls = [],
            controlTypes = this.getTypeList(type);
            // 获取全部的时候不传id
            if(!currentId){
                currentId = 'currentId';
            }
        if (tinymce && tinymce.get('form-editor')) {
            const $editorBody = jQuery('<div>' + tinymce.get('form-editor').getContent({ format: 'raw' }) + '</div>'),
                record = {};

            // 排除当前控件
            record[currentId] = true;

            // 遍历编辑器内部，拿到所有的控件列表
            $editorBody.find('[data-efb-control]').each(function () {
                const $this = jQuery(this),
                    $id = $this.attr('id'),
                    $type = $this.attr('data-efb-control');
                //由于编辑器选中的控件会有一个模板示例，所以选中的控件会出现两次，这里过滤下。
                if (record[$id]) return;
                record[$id] = true;

                // 通过需要的类型来判断，支持返回的控件类型
                if (controlTypes.indexOf($type) != -1) {
                    controls.push(self.initControl($this));
                }
            })
        }
        return controls;
    }

    /**
     * 获取需要的控件类型列表
     * @param  {string | string[]} type 类型
     * @return {string[]} 返回对应的结果
     */
    private getTypeList(type: string | string[]): string[] {
        let typeList = ['text', 'textarea', 'select', 'data-selector'];
        switch (type) {
            case 'formula':
                typeList = ['text', 'textarea', 'select', 'amount'];
                break;
            case 'display':
                typeList = ['text', 'textarea', 'select', 'data-selector', 'radio', 'checkbox', 'amount'];
                break;
            case 'all':
                typeList = ['detail-layout', 'text', 'textarea', 'radio', 'checkbox', 'select', 'editor', 'data-selector', 'signature-picture', 'upload', 'countersign', 'dynamic-info', 'electronic-signature', 'barcode', 'amount'];
                break;
            default:
                if (Array.isArray(type)) {
                    typeList = type;
                }
                break;
        }
        return typeList;
    }

    // 初始化控件
    initControl(item) {
        const control = {};
        if (item instanceof jQuery) {
            control['id'] = item['attr']('id');
            control['title'] = item['attr']('title');
            control['type'] = item['attr']('data-efb-control')
        }
        return control;
    }
}