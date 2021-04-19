import tinymce from 'tinymce';
import 'tinymce/icons/default/icons.min.js';

import 'tinymce/themes/silver/theme';
import 'tinymce/plugins/noneditable';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/code';
import 'tinymce/plugins/table';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/media';
import 'src/assets/tinymce/plugins/powerpaste/plugin.js';
import 'src/assets/tinymce/plugins/advcode/plugin.js';

import { angular } from 'src/app/core/angular-utils'
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormEditorService } from './form-editor.service';
import { ControlConfigService } from '../../utils/service/control-config.service';
import { EditorService } from '../../service/editor.service';


@Component({
    selector: 'form-editor',
    templateUrl: './form-editor.component.html',
    styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent implements OnInit {

    constructor(
        private formEditorService: FormEditorService,
        private changeRef: ChangeDetectorRef,
        private controlService: ControlConfigService,
        private editorService: EditorService,
    ) { }
    public options;
    public editor;

    ngOnInit() {
        this.options = this.formEditorService.EDITOR_OPTIONS();

        this.options['setup'] = this.setUp();
    }
    ngAfterViewInit() {
        tinymce.init(this.options);
    }
    ngOnDestroy() {
        // this.subscriptionList.forEach(item => item.unsubscribe());
        tinymce.remove(this.editor);
    }


    setUp() {
        return editor => {
            const controlList = [];
            angular.forEach(this.controlService.controlList(), (value, index) => {
                const banInsert = ['horizontal-layout', 'vertical-layout', 'label', 'link', 'column'];
                if (banInsert.indexOf(index) === -1) {
                    controlList.push({
                        type: 'menuitem',
                        text: value.title,
                        onAction: () => {
                            this.addControl(index);
                        }
                    });
                }
            });
            // 控件快捷插入
            editor.ui.registry.addNestedMenuItem('insertControl', {
                text: 'Insert Control',
                getSubmenuItems: () => {
                    return controlList;
                }
            });
            // // 删除控件
            // editor.ui.registry.addButton('deleteControl', {
            //     // title: trans('common.delete'),
            //     icon: 'close',
            //     tooltip: this.trans('common.delete'),
            //     onAction: (e) => {
            //         const $selectedNode = jQuery(editor.selection.getNode());
            //         editor.undoManager.add();
            //         if ($selectedNode.attr('data-efb-control')) {
            //             const controlId = $selectedNode.attr('id'),
            //                 controlType = $selectedNode.attr('data-efb-control');

            //             // 移除控件
            //             // setCursorLocation()要两个参数：node\offset
            //             tinymce.get('form-editor').selection.setCursorLocation(editor.selection.getNode(), 0);
            //             $selectedNode.remove();
            //             editor.insertContent('');

            //             // 移除控件列表中的控件
            //             if (this.controlList[controlId]) {
            //                 delete this.controlList[controlId];

            //                 // 移除控件分类列表中的控件
            //                 if (this.controlListByCategory[controlType] && this.controlListByCategory[controlType]['controlList']
            //                     && this.controlListByCategory[controlType]['controlList'][controlId]) {
            //                     delete this.controlListByCategory[controlType]['controlList'][controlId];
            //                     if (Object.keys(this.controlListByCategory[controlType]['controlList']).length === 0) {
            //                         delete this.controlListByCategory[controlType];
            //                     }
            //                 }
            //                 this.controlSummaryService.handle$.next({
            //                     key: 'update',
            //                     value: this.controlListByCategory
            //                 });
            //                 // 删除控件后同步更新form-design的attributeValue
            //                 this.controlAttributeService.setAttribute$.next('');
            //                 this.editorService.currentEditArea$.emit('');
            //             }
            //             // 更新控件概要列表
            //             this.formDesignService.summaryControlChange$.emit('update');

            //             this.changeRef.detectChanges();
            //         }
            //         // 执行这个操作的目的是为了删除控件后让那个×自动消失
            //         // tinnymce应该有这个方法的，还没找到
            //         // 如果执行下面这个操作  会滚动到底部
            //         // tinymce.get('form-editor').selection.getStart().click();
            //         // 删除了空的明细布局，保存表单还提示存在没有子项的明细
            //         // 这个方法会增加一次撤销级别
            //         // editor.undoManager.add();
            //         // editor.insertContent('');
            //         // editor.undoManager.undo();
            //         // editor.setDirty(false);
            //         // editor.focus(false);
            //         editor.save();
            //         this.changeRef.detectChanges();

            //     },
            // });

            // // 单击控件操作
            // editor.on('click', (e) => {
            //     this.styleSetService.close$.emit('');
            //     const $element = jQuery(e.target);
            //     // 定位到全部标签列表
            //     this.formDesignService.controlTab$.emit('blur');
            //     // this.openMenu();
            //     // 移除表单检查的控件定位
            //     jQuery(tinymce.get('form-editor').getBody()).find('.control-error[data-efb-control]').removeClass('control-error');

            //     const allElement = jQuery(tinymce.get('form-editor').getBody()).find('*[data-efb-control]');

            //     angular.forEach(allElement, (data, index) => {
            //         const newfileCounter = Number(data.id && data.id.replace('DATA_', ''));
            //         if (this.attributeService.fieldCounter < newfileCounter) {
            //             this.attributeService.fieldCounter = newfileCounter;
            //         }
            //     });

            //     // 控件必须有 data-efb-control 属性
            //     if ($element.attr('data-efb-control')) {
            //         const controlType = $element.attr('data-efb-control');
            //         const attributes = this.complexControlService.controlList()[controlType]['attribute'];
            //         this.ngZone.run(_ => {
            //             this.controlAttributeService.setAttributeValue$.next($element);
            //             this.controlAttributeService.setAttribute$.next(attributes);
            //             this.editorService.currentEditArea$.emit('control');
            //             this.selectTab.emit(1);
            //         });

            //     }
            //     this.changeRef.detectChanges();
            // });
            this.changeRef.markForCheck();
        };
    }

    addControl(type) {
        console.log('插入控件了')
        let controlId, controlTitle, controlName;

        const controlHtml = this.editorService.getControlHtml(type, controlId, controlTitle, controlName)
        tinymce.execCommand('mceInsertContent', false, controlHtml);
    }

}
