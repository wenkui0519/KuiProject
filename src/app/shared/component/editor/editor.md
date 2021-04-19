# 编辑器组件
### 输入
* directiveId: [string] 组件唯一标识，组件ID
* format: [string] 保存的格式，支持'raw', 'text'等等;
* menubar: [boolean] 是否展示菜单栏;
* statusbar: [boolean] 是否展示状态栏;
* language_url: 多语言文件地址
* powerpaste_html_import: [string] 粘贴提示;
* paste_data_images: [boolean] 是否支持粘贴图片;
* automatic_uploads: boolean;
* plugins: string;
* table_default_styles: object;
* table_default_attributes: object;
* extendTools: string[] 扩展的编辑器功能;
* skin_url: string;
* extended_valid_elements: 'pre[*];script[*];style[*]';
* valid_children: '+body[style|script];pre[script|div|p|br|span|img|style|h1|h2|h3|h4|h5];*[*]';
* valid_elements: '*[*]';
* contextmenu: 'insertControl | inserttable cell row column deletetable';
* contextmenu_never_use_native: boolean;
* images_upload_handler: () => {};
* content_css: string;
* fontsize_formats: string;
* font_formats: string;

### 输出
* ngModelChange: 





### 需要改进的地方
* extendTools: Array, 取值为['system-data', 'flow-sequent', 'vote-field', 'file-style', 'image']的子级，不传时默认展示系统数据，如果editorMode等于0,默认支持插入图片
** 不合理，修改建议：
* 1、editorMode是否有存在的必要性？ 如果存在应该明确不同的模式提供哪些功能，现在不明确。
* 2、extendTools不传时是否需要默认展示系统数据
* 3、...
