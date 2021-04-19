import { LocationStrategy } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
// import { HttpService } from '@service/http.service';
// import { UtilService } from '@service/util.service';

@Injectable({
    providedIn: 'root'
})
export class FormEditorService {
    handle$: EventEmitter<any>;
    constructor(
        // private utilService: UtilService,
        // private httpService: HttpService,
        private locationStrategy: LocationStrategy
    ) {
        this.handle$ = new EventEmitter();
    }
    EDITOR_OPTIONS() {
        return {
            selector: '#form-editor',
            menubar: false,
            toolbar: 'fullscreen undo redo bold italic underline styleselect\
            fontselect fontsizeselect forecolor backcolor alignleft alignright \
            aligncenter alignjustify bullist numlist table link image media advcode',
            toolbar_mode: 'floating',
            statusbar: false,
            resize: false,
            // language: 'zh_CN',
            // language_url: 'assets/tinymce/langs/zh_CN.js',
            contextmenu_never_use_native: true,
            plugins: 'powerpaste noneditable table contextmenu code image link media advcode',
            // code_dialog_width: 1000,
            // height: 600,
            height: '100%',
            document_base_url: this.locationStrategy.getBaseHref(),
            extended_valid_elements: 'pre[*],script[*],style[*]',
            valid_children: '+body[style|script],pre[script|div|p|br|span|img|style|h1|h2|h3|h4|h5],*[*]',
            valid_elements: '*[*]',
            skin: 'lightgray',
            skin_url: 'assets/skins/lightgray',
            // 粘贴配置
            paste_filter_drop: false,
            paste_remove_styles_if_webkit: false,
            paste_retain_style_properties: 'all',
            paste_webkit_styles: 'all',
            paste_enable_default_filters: false,
            paste_word_valid_elements: 'all',
            paste_merge_formats: false,
            // table 默认宽度 100%
            table_default_styles: {
                'width': '100%',
                'border-collapse': 'collapse',
                'border-width': '0',
                'border-color': '',
                'border-style': 'solid'
            },
            table_default_attributes: {
                border: '1px',
                cellpadding: '5px',
            },
            table_resize_bars: true,
            // autosave_restore_when_empty: false,
            powerpaste_word_import: 'prompt',
            powerpaste_html_import: 'prompt',
            paste_data_images: true,
            automatic_uploads: true,
            content_css: 'assets/css/form-builder-content.css',
            contextmenu: 'insertControl | inserttable cell row column deletetable',
            end_container_on_empty_block: true,
            convert_urls: false,
            // link_assume_external_targets: true
            // images_upload_handler: (blobInfo, success, failure) => {
            //     const file = new FileReader();
            //     file.onload = (e) => {

            //         this.httpService.sendRequest('api/attachment/base64', {
            //             method: 'POST',
            //             data: {
            //                 image_file: e.target['result']
            //             }
            //         }, true).subscribe((response) => {
            //             if (response && response['data']) {
            //                 success(this.utilService.getAttachmentFile(response['data']['attachment_id']));
            //             }
            //         });
            //     };

            //     file.readAsDataURL(blobInfo.blob());
            // },
        };
    }
}
