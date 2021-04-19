import { LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class EditorConfigService{
    constructor(
        private locationStrategy: LocationStrategy
    ) {
    }
    base64: any;

    FULL_TOOL() {
        return 'fullscreen undo redo bold italic underline styleselect\
            fontselect fontsizeselect forecolor backcolor alignleft alignright \
            aligncenter alignjustify bullist numlist table link image video handwrite emoji commonphrase signaturepicture attachment';
    }

    EDITOR_CONFIG() {
        return {
            directiveId: 'editor',
            document_base_url: this.locationStrategy.getBaseHref(),
            format: 'html',
            menubar: false,
            statusbar: false,
            language: 'zh_CN',
            language_url: 'assets/tinymce/langs/zh_CN.js',
            powerpaste_html_import: 'prompt',
            paste_data_images: true,
            automatic_uploads: true,
            plugins: ['fullscreen', 'textcolor', 'code', 'paste', 'table', 'link', 'tabfocus',
                'charmap', 'insertdatetime', 'preview', 'searchreplace', 'noneditable', 'autosave', 'signaturepicture'].join(' '),
            table_default_styles: {
                width: '100%',
                'border-collapse': 'collapse',
                'border-color': '#666'
            },
            table_default_attributes: {
                border: '1px',
                cellpadding: '5px'
            },
            // 默认展示系统数据
            // extendTools: ['system-data', 'flow-sequent', 'vote-field', 'file-style'],
            extendTools: ['system-data'],
            skin_url: 'assets/skins/lightgray1',
            extended_valid_elements: 'pre[*],script[*],style[*]',
            valid_children: '+body[style|script],pre[script|div|p|br|span|img|style|h1|h2|h3|h4|h5],*[*]',
            valid_elements: '*[*]',
            contextmenu: 'insertControl | inserttable cell row column deletetable',
            contextmenu_never_use_native: false,
            content_css: 'assets/css/form-builder-content.css',
            fontsize_formats: '12px 14px 16px 18px 20px 22px 24px 26px 28px 30px 36px',
            font_formats: '宋体=宋体,SimSun;楷体=楷体,楷体_GB2312, SimKai;微软雅黑=微软雅黑,Microsoft YaHei;黑体=黑体, SimHei;隶书=隶书,'
                + ' SimLi;andale mono=andale mono;arial=arial, helvetica,sans-serif',
            content_style: ''
        };
    }
}
