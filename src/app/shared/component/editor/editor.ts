export interface EditorConfig {
    /**
     * 组件的唯一标识
     */
    directiveId: string;
    format: string;
    menubar: boolean;
    statusbar: boolean;
    powerpaste_html_import: string;
    paste_data_images: boolean;
    automatic_uploads: boolean;
    plugins: string;
    table_default_styles: object;
    table_default_attributes: object;
    /**
     * 扩展的编辑器功能
     */
    extendTools: string[];
    skin_url: string;
    extended_valid_elements: 'pre[*];script[*];style[*]';
    valid_children: '+body[style|script];pre[script|div|p|br|span|img|style|h1|h2|h3|h4|h5];*[*]';
    valid_elements: '*[*]';
    contextmenu: 'insertControl | inserttable cell row column deletetable';
    contextmenu_never_use_native: boolean;
    images_upload_handler: () => {};
    content_css: string;
    fontsize_formats: string;
    font_formats: string;
    content_style: string;
}
