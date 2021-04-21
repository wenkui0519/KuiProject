import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class ControlConfigService {
    constructor(){
    }
     controlList(){
         return {
            'editor': {
                'view': {
                    'nodeName': 'div',
                    'class': 'control-default-editor'
                },
                'title': '编辑器',
                'attribute': {
                    // 'base': ['type', 'title', 'editor', 'id'],
                    'base': ['title',],
                    'style': ['width', 'height'],
                    'display': ['display-condition'],
                    'other': ['id']
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