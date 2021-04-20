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
import { AttributeService } from '../../utils/service/attribute.service';


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
        private attributeService: AttributeService,
    ) { }
    public options;
    public editor;

    ngOnInit() {

        console.log(jQuery(''))



        
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
            // 删除控件
            editor.ui.registry.addButton('deleteControl', {
                icon: 'close',
                tooltip: 'delete',
                onAction: (e) => {
                    const $selectedNode = jQuery(editor.selection.getNode());
                    editor.undoManager.add();
                    if ($selectedNode.attr('data-efb-control')) {
                        const controlId = $selectedNode.attr('id'),
                            controlType = $selectedNode.attr('data-efb-control');

                        // 移除控件
                        tinymce.get('form-editor').selection.setCursorLocation(editor.selection.getNode(), 0);
                        $selectedNode.remove();
                        editor.insertContent('');

                        this.changeRef.detectChanges();
                    }
                    editor.save();
                    this.changeRef.detectChanges();

                },
            });

            // 单击控件操作
            editor.on('click', (e) => {
                // this.styleSetService.close$.emit('');
                const $element = jQuery(e.target);

                const allElement = jQuery(tinymce.get('form-editor').getBody()).find('*[data-efb-control]');
                angular.forEach(allElement, (data, index) => {
                    const newfileCounter = Number(data.id.replace('DATA_', ''));
                    if (this.attributeService.controlCount < newfileCounter) {
                        this.attributeService.controlCount = newfileCounter;
                    }
                });

                // 控件必须有 data-efb-control 属性
                if ($element.attr('data-efb-control')) {
                    const controlType = $element.attr('data-efb-control');
                    const attributes = this.controlService.controlList()[controlType]['attribute'];
                    // this.ngZone.run(_ => {
                    //     this.controlAttributeService.setAttributeValue$.next($element);
                    //     this.controlAttributeService.setAttribute$.next(attributes);
                    //     this.editorService.currentEditArea$.emit('control');
                    // });
                }
                this.changeRef.detectChanges();
            });
            this.changeRef.markForCheck();
        };
    }

    addControl(type) {
        let controlId, controlTitle, controlName;
        // 拿到当前表单内容中所有的控件，遍历后拿到当前控件idcount ++，更新到全局服务中的属性
        const allControlItem = $(tinymce.get('form-editor').getBody()).find('*[data-efb-control]');
        angular.forEach(allControlItem, item => {
            const newCount = Number(item.id.replace('Data_', ''));
            if (newCount > this.attributeService.controlCount) {
                this.attributeService.controlCount = newCount;
            }
        })

        //给controlId赋值。
        this.attributeService.controlCount++;
        controlId = `Data_${this.attributeService.controlCount}`;

        //controlTitle,赋值，去controlConfig中拿默认title+count。
        controlTitle = `${this.controlService.controlList()[type]['title']}_${this.attributeService.controlCount}`

        const controlHtml = this.editorService.getControlHtml(type, controlId, controlTitle, this.controlService.controlList()[type]['title'])

        // 如何当前选中在某个控件上，则将选区移动到控件之后
        if (tinymce.get('form-editor').dom.is(tinymce.get('form-editor').selection.getNode(), '[data-efb-control]')) {
            tinymce.get('form-editor').selection.collapse();
        }

        tinymce.execCommand('mceInsertContent', false, controlHtml);

        //         console.log('插入控件了')
        //         let controlId, controlTitle, controlName;

        //         const controlHtml = this.editorService.getControlHtml(type, controlId, controlTitle, controlName)
        //         tinymce.execCommand('mceInsertContent', false, controlHtml);
    }

}
