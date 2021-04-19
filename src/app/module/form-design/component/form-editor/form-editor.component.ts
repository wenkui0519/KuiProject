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

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormEditorService } from './form-editor.service';
import { ControlConfigService } from '../../utils/service/control-config.service';


@Component({
    selector: 'form-editor',
    templateUrl: './form-editor.component.html',
    styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent implements OnInit {

    constructor(
        private formEditorService: FormEditorService,
        private changeRef: ChangeDetectorRef,
        private controlService:ControlConfigService,
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
            const allControlTemp = this.controlService.controlList();
            allControlTemp.forEach(element => {
                
            });
            angular.forEach(this.complexControlService.controlList(), (value, index) => {
                const banInsert = ['horizontal-layout', 'vertical-layout', 'label', 'link', 'column'];
                if (banInsert.indexOf(index) === -1) {
                    controlList.push({
                        type: 'menuitem',
                        text: value.title,
                        onAction: () => {
                            if (this.type === 'main') {
                                this.addControl(index);
                            } else {
                                this.euiNotify.show(this.trans('flow.subform_does_not_support_inserting_controls'));
                            }
                        }
                    });
                }
            });
            // if (this.type === 'main') {
            //     // 控件快捷插入
            //     editor.ui.registry.addNestedMenuItem('insertControl', {
            //         text: this.trans('flow.insert_control'),
            //         getSubmenuItems: () => {
            //             return controlList;
            //         }
            //     });
            // } else {
            //     editor.ui.registry.addButton('editControl', {
            //         icon: 'align-justify',
            //         tooltip: this.trans('common.details'),
            //         onAction: (e) => {
            //             const $element = jQuery(editor.selection.getNode()),
            //                 controlType = $element.attr('data-efb-control') || '';
            //             if (controlType == 'detail-layout') {
            //                 let layoutInfo = $element.attr('data-efb-layout-info') || '';
            //                 const modalRef = this.euiModal.open(LayoutDetailComponent, {
            //                     size: 'md',
            //                 });
            //                 modalRef.componentInstance.layoutInfo = angular.copy(layoutInfo);
            //                 modalRef.result.then(info => {
            //                     layoutInfo = info.layoutInfo;
            //                     // 明细字段控件编辑之后需要更新全局的控件列表
            //                     $element.attr('data-efb-layout-info', angular.toJson(layoutInfo));
            //                     // 将新的内容发射出去
            //                     this.onChange(editor.getContent({ format: 'raw' }).trim());
            //                 });
            //             }
            //         },
            //     });
            // }
            // // 删除控件
            // editor.ui.registry.addButton('deleteControl', {
            //     // title: trans('common.delete'),
            //     icon: 'close',
            //     tooltip: this.trans('common.delete'),
            //     onAction: (e) => {
            //         const $selectedNode = jQuery(editor.selection.getNode());
            //         editor.undoManager.add();
            //         // 删除分隔线
            //         if ($selectedNode.is('hr')) {
            //             $selectedNode.remove();
            //         } else if ($selectedNode.attr('data-efb-control')) {
            //             const controlId = $selectedNode.attr('id'),
            //                 controlType = $selectedNode.attr('data-efb-control');

            //             // 移除控件
            //             // setCursorLocation()要两个参数：node\offset
            //             tinymce.get('form-editor').selection.setCursorLocation(editor.selection.getNode(), 0);
            //             $selectedNode.remove();
            //             // editor.undoManager.add();
            //             editor.insertContent('');
            //             // editor.undoManager.undo();
            //             // $scope.$apply(function() {
            //             //     this.showAttribute = false;
            //             // });

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
            //             // editor.save();

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

            // // 分隔线和控件 添加删除按钮
            // editor.ui.registry.addContextToolbar('deleteControls', {
            //     predicate: control => {
            //         return editor.dom.getAttrib(control, 'data-efb-control') || tinymce.get('form-editor').dom.getParent(tinymce.get('form-editor').selection.getStart(), 'hr');
            //     },
            //     items: 'deleteControl',
            //     position: 'node',
            //     scope: 'node'
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

            //     } else if (angular.isDefined($element.attr('data-mce-href')) || angular.isDefined($element.parents('a[data-mce-href]').attr('data-mce-href'))) {
            //         this.editorService.currentEditArea$.emit('control');
            //         this.controlAttributeService.setAttribute$.next({
            //             'base': ['link']
            //         });
            //         this.controlAttributeService.setAttributeValue$.next($element);
            //         this.selectTab.emit(1);
            //     } else {
            //         this.controlAttributeService.setAttribute$.next({});
            //         this.controlAttributeService.setAttributeValue$.next($element);
            //         // 加not是为了选择td的功能
            //         const selected = jQuery(editor.getBody()).find('*[data-mce-selected]:not(td):not(table)');
            //         if (selected.length > 0) {
            //             angular.forEach(selected, (value, index) => {
            //                 jQuery(value).removeAttr('data-mce-selected');
            //             });
            //         }
            //         this.hrElement = editor.dom.getParent(editor.selection.getStart(), 'hr');

            //         this.tableElm = editor.dom.getParent(editor.selection.getStart(), 'table');
            //         this.selectedCell = editor.dom.select('td[data-mce-selected],th[data-mce-selected]');
            //         this.selectedRow = editor.dom.getParent(editor.selection.getStart(), 'tr');
            //         this.cellElm = editor.dom.getParent(editor.selection.getStart(), 'td,th');
            //         if (!this.selectedCell.length && this.cellElm) {
            //             this.selectedCell.push(this.cellElm);
            //         }

            //         this.cellElm = this.cellElm || this.selectedCell[0];

            //         if ((this.tableElm && this.cellElm) || this.hrElement) {
            //             // 分隔线
            //             if (this.hrElement) {
            //                 this.editorService.currentEditArea$.emit({
            //                     key: 'hr',
            //                     value: {
            //                         hrElement: this.hrElement,
            //                     }
            //                 });
            //             } else {
            //                 this.editorService.currentEditArea$.emit({
            //                     key: 'table',
            //                     value: {
            //                         cellElm: this.cellElm,
            //                         tableElm: this.tableElm,
            //                         selectedRow: this.selectedRow,
            //                         selectedCell: this.selectedCell
            //                     }
            //                 });
            //             }
            //         } else {
            //             this.editorService.currentEditArea$.emit('');
            //             this.selectedControls = [];
            //             // 点击编辑器取消控件控件概要选中
            //             this.controlSummaryService.handle$.next({
            //                 key: 'leave'
            //             });
            //         }

            //     }
            //     this.changeRef.detectChanges();

            //     // 如果不是控件，顶部菜单中的文字和背景颜色才显示出对应的颜色,
            //     this.styleSetService.changeColor$.emit($element.attr('data-efb-control') ? null : e.target);
            //     // this.changeForeAndBackColor($element.attr('data-efb-control') ? null : e.target);
            // });
            // editor.on('ExecCommand change NodeChange ObjectResized', () => {
            //     if (!this.options['debounce']) {
            //         editor.save();
            //         this.onChange(editor.getContent({ format: 'raw' }).trim());
            //     }
            // });
            // editor.on('blur', () => {
            //     this.onChange(editor.getContent({ format: 'raw' }).trim());
            // });
            // editor.ui.registry.addButton('editImg', {
            //     icon: 'preferences',
            //     tooltip: this.trans('common.setting'),
            //     onAction: (e) => {
            //         const $element = jQuery(editor.selection.getNode()),
            //             width = $element.attr('width') || '',
            //             height = $element.attr('height') || '';
            //         const modalRef = this.euiModal.open(ImgSetComponent, {
            //             size: 'md',
            //         });
            //         modalRef.componentInstance.width = width || 'auto';
            //         modalRef.componentInstance.height = height || 'auto';
            //         modalRef.result.then(data => {
            //             $element.attr('width', data.width);
            //             $element.attr('height', data.height);
            //         });
            //     }
            // });

            // editor.ui.registry.addContextToolbar('editImg', {
            //     predicate: control => {
            //         return jQuery(control).prop('tagName') === 'IMG';
            //     },
            //     items: 'editImg',
            //     position: 'node',
            //     scope: 'node'
            // });
            // if (this.type !== 'main') {
            //     editor.ui.registry.addContextToolbar('detail-edit', {
            //         predicate: control => {
            //             return editor.dom.getAttrib(control, 'data-efb-control') == 'detail-layout';
            //         },
            //         items: 'editControl',
            //         position: 'node',
            //         scope: 'node'
            //     });
            // }
            // this.changeRef.markForCheck();
        };
    }

}
