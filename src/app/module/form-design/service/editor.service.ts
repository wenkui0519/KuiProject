import { Injectable } from '@angular/core';
import { angular } from 'src/app/core/angular-utils'
import { ControlConfigService } from '../utils/service/control-config.service';


@Injectable({
    providedIn: 'root'
})

export class EditorService {
    constructor(
        private controlConfigService: ControlConfigService,
    ) {

    }
    /**
     * 获取控件模板
     * @param controlType
     * @param controlId
     * @param controlTitle
     * @param controlName
     */
    getControlHtml(controlType, controlId, controlTitle, controlName) {
        const controlView = this.controlConfigService.controlList()[controlType].view,
            controlDefault = this.controlConfigService.controlList()[controlType].default ?
                this.controlConfigService.controlList()[controlType].default : {},
            controlInfo = {
                'id': controlId,
                'title': controlTitle,
                'value': controlView.value,
                // 标明控件类型
                'data-efb-control': controlType,
                // 把控件的名称带在属性中，某些控件会用到
                'data-efb-control-name': controlName,
            };

        // 控件指令
        controlInfo['data-efb-control-' + controlType] = '';

        const $controlObj = jQuery('<' + controlView.nodeName + '/>').attr(controlInfo);

        $controlObj.html('&nbsp;');

        if (controlView.type) {
            $controlObj.attr('type', controlView.type);
        }

        if (controlView.class) {
            $controlObj.addClass(controlView.class);
        }

        for (const item in controlDefault) {
            if (item.indexOf('data-') !== -1) {
                $controlObj.attr(item, controlDefault[item]);
            }
        }

        $controlObj.addClass('mceNonEditable');

        return $controlObj.get(0).outerHTML;
    }
}
