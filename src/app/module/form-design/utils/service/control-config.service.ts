import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ControlConfigService {
    constructor() {
    }
    controlList() {
        return {
            'text': {
                'view': {
                    'nodeName': 'span',
                    'type': 'text',
                    'class': 'control-default-text',
                },
                'title': '单行文本框',
                'attribute': {
                    // 'base': ['type', 'title', 'placeholder', 'format', 'datasource', 'id'],
                    'base': ['type', 'title', 'placeholder'],
                    'style': ['width', 'height', 'fontSize', 'fontFamily', 'foreground', 'background', 'border'],
                    'display': ['hide', 'display-condition']
                },
                'attributes': [
                    'width',
                    'height',
                    'font-size',
                    'font-family',
                    'color',
                    'title',
                    'background-color',
                    'border',
                    'border-bottom',
                    'data-efb-border-type',
                    'data-efb-default',
                    'data-efb-is-current',
                    'data-efb-placeholder',
                    'data-efb-placeholder-type',
                    'data-efb-display-condition'
                ],
                'default': {
                    'height': '27px',
                    'width': '160px',
                    'fontSize': '12px',
                    'foreground': '#333333',
                    'background-color': '#ffffff',
                    'border': '1px solid #dcdcdc',
                    'data-efb-border-type': 'all',
                    'data-efb-format': 'text',
                }
            },
            'textarea': {
                'view': {
                    'nodeName': 'span',
                    'class': 'control-default-textarea',
                },
                'title': '多行文本框',
                'attribute': {
                    // 'base': ['type', 'title', 'placeholder', 'default', 'datasource', 'id'],
                    'base': ['type', 'title', 'placeholder','id'],
                    'style': ['width', 'auto-height', 'fontSize', 'fontFamily', 'foreground', 'background', 'border'],
                    'display': ['hide', 'display-condition'],
                },
                'attributes': [
                    'width',
                    'height',
                    'font-size',
                    'font-family',
                    'color',
                    'background-color',
                    'border',
                    'border-bottom',
                    'data-efb-border-type',
                    'data-efb-default',
                    'data-efb-placeholder',
                    'data-efb-placeholder-type',
                    'data-efb-display-condition'
                ],
                'default': {
                    'height': '50px',
                    'width': '200px',
                    'fontSize': '12px',
                    'foreground': '#333333',
                    'background-color': '#ffffff',
                    'border': '1px solid #ccc'
                }
            },
            // 'radio': {
            //     'view': {
            //         'nodeName': 'span',
            //         'type': 'radio',
            //         'class': 'control-default-radio',
            //     },
            //     'title': '单选框',
            //     'attribute': {
            //         'base': ['type', 'title', 'option', 'id'],
            //         'style': ['fontSize', 'fontFamily', 'foreground', 'background'],
            //         'display': ['orientation', 'display-condition'],
            //         'other': ['id']
            //     },
            //     'attributes': [
            //         'data-efb-selected-options',
            //         'data-efb-options',
            //         'data-efb-orientation',
            //         'font-size',
            //         'font-family',
            //         'color',
            //         'background-color',
            //         'data-efb-display-condition'
            //     ],
            //     'default': {
            //         'data-efb-orientation': 'h'
            //     }
            // },
            // 'checkbox': {
            //     'view': {
            //         'nodeName': 'span',
            //         'type': 'checkbox',
            //         'class': 'control-default-checkbox',
            //     },
            //     'title': '复选框',
            //     'attribute': {
            //         'base': ['type', 'title', 'option', 'id'],
            //         'style': ['fontSize', 'fontFamily', 'foreground', 'background'],
            //         'display': ['orientation', 'display-condition'],
            //         'other': ['id']
            //     },
            //     'attributes': [
            //         'data-efb-selected-options',
            //         'data-efb-options',
            //         'data-efb-orientation',
            //         'font-size',
            //         'font-family',
            //         'color',
            //         'background-color',
            //         'data-efb-display-condition'
            //     ],
            //     'default': {
            //         'data-efb-orientation': 'h'
            //     }
            // },
            // 'select': {
            //     'view': {
            //         'nodeName': 'span',
            //         'class': 'editor-select-style control-default-select'
            //     },
            //     'title': '下拉框',
            //     'attribute': {
            //         'base': ['type', 'title', 'select-option', 'select-datasource', 'multiple', 'id'],
            //         'style': ['width', 'height', 'fontSize', 'fontFamily', 'foreground', 'background', 'border'],
            //         'display': ['display-condition'],
            //         'other': ['id']
            //     },
            //     'attributes': [
            //         'width',
            //         'height',
            //         'font-size',
            //         'font-family',
            //         'border',
            //         'color',
            //         'border-bottom-width',
            //         'border-bottom-style',
            //         'border-bottom-color',
            //         'border-bottom',
            //         'background-color',
            //         'data-efb-options',
            //         'data-efb-control-select',
            //         'data-efb-selected-options',
            //         'data-efb-source',
            //         'data-efb-source-value',
            //         'data-efb-multiple',
            //         'data-efb-with-text',
            //         'data-efb-display-condition'
            //     ],
            //     'default': {
            //         'height': '27px',
            //         'width': '160px',
            //         'fontSize': '12px',
            //         'foreground': '#333333',
            //         // 'background-color': '#fff',
            //         'border': '1px solid #a6a6a6',
            //         'data-efb-with-text': 'true'
            //     }
            // },
            'editor': {
                'view': {
                    'nodeName': 'div',
                    'class': 'control-default-editor'
                },
                'title': '编辑器',
                'attribute': {
                    // 'base': ['type', 'title', 'editor', 'id'],
                    'base': ['type', 'title', 'id'],
                    'style': ['width', 'height'],
                    'display': ['display-condition'],
                },
                'attributes': [
                    'width',
                    'height',
                    'data-efb-default',
                    'data-efb-readonly',
                    'data-efb-display-condition'
                ],
                'default': {
                    'height': '200px',
                    'width': '100%',
                    'data-efb-readonly': 'false'
                }
            },
        }
    }
}
