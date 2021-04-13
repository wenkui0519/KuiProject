import tinymce from 'tinymce';

// A theme is also required
// import 'tinymce/themes/silver/theme';
// // Any plugins you want to use has to be imported
// import 'tinymce/plugins/paste';
// import 'tinymce/plugins/noneditable';
// import 'tinymce/plugins/contextmenu';
// import 'tinymce/plugins/code';
// import 'tinymce/plugins/image';
// import 'tinymce/plugins/link';
// import 'tinymce/plugins/media';
// import 'tinymce/plugins/autosave';
// import 'tinymce/plugins/codesample';
// import 'src/assets/tinymce/plugins/powerpaste/plugin.js';
// import 'src/assets/tinymce/plugins/advcode/plugin.js';

// import { angular } from 'core/angular-utils';

import {
    ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild
} from '@angular/core';
@Component({
    selector: 'form-design',
    templateUrl: './form-design.component.html',
    styleUrls: ['./form-design.component.scss']
})
export class FormDesignComponent implements OnInit {
    

    constructor(
    ) {
    }
    ngOnInit(){

    }
    
}
