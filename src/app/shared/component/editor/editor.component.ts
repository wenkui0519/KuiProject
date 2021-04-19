
// Import TinyMCE
import tinymce from 'tinymce';
// A theme is also required
import 'tinymce/themes/silver/theme';
import 'tinymce/icons/default/icons.min.js';
// Any plugins you want to use has to be imported
import 'tinymce/plugins/paste';
import 'tinymce/plugins/noneditable';
import 'tinymce/plugins/table';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/media';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/tabfocus';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/autoresize';
import 'web/src/assets/tinymce/plugins/commonphrase/plugin.js';
import 'web/src/assets/tinymce/plugins/emoji/plugin.js';
import 'web/src/assets/tinymce/plugins/powerpaste/plugin.js';

import { angular } from 'src/app/core/angular-utils'


import {
    ChangeDetectorRef, Component, ComponentRef,
    ElementRef, EventEmitter, Input, OnInit, Optional,
    Output
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { EditorConfigService } from './editor-config.service';
import { EditorService } from './editor.service';

@Component({
    selector: 'eui-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
    // 编辑器配置
    @Input() config?: object;

    constructor(
        public editorConfigService: EditorConfigService,
        public element: ElementRef,
        private editorService: EditorService,
    ) {
    }

    // 编辑器属性
    options: any;

    // 编辑器对象
    editor: object;

    // 编辑器空值
    tinyInstance: any;
    editorId: string;

    ngOnInit() {
        this.editorService.editorId++;
        this.editorId = 'editor' + this.editorService.editorId;
        this.mergeConfig();
    }

    public mergeConfig() {
        this.options = this.editorConfigService.EDITOR_CONFIG();
        this.options['toolbar'] = this.editorConfigService.FULL_TOOL();

        if (!this.config) {
            this.config = {};
        }
        const basePlugins = ['fullscreen', 'textcolor', 'link', 'tabfocus', 'charmap', 'insertdatetime', 'preview', 'searchreplace', 'emoji', 'noneditable', 'commonphrase'].join(' ');
        if (Array.isArray(this.config['plugins'])) {
            this.config['plugins'] = this.config['plugins'].join(' ');
        }

        this.config['plugins'] = basePlugins + ' ' + (this.config['plugins'] || '');
        this.options = angular.merge({}, this.options, this.config);

        this.options['selector'] = '#' + this.editorId;
        this.initEditor();
    }

    public initEditor() {
        tinymce.init(this.options)
    }
}
