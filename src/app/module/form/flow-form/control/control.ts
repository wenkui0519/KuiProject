import { TextComponent } from './text/text.component';
import { SelectComponent } from './select/select.component';
import { TextareaComponent } from './textarea/textarea.component';
import { RadioComponent } from './radio/radio.component';
import { EditorComponent } from './editor/editor.component';
import { CountersignComponent } from './countersign/countersign.component';
import { ElectronicSignatureComponent } from './electronic-signature/electronic-signature.component';
import { DetailLayoutComponent } from './detail-layout/detail-layout.component';

import { DataSelectorComponent } from './data-selector/data-selector.component';
import { SignaturePictureComponent } from './signature-picture/signature-picture.component';
import { UploadComponent } from './upload/upload.component';
import { DynamicInfoComponent } from './dynamic-info/dynamic-info.component';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { LabelComponent } from './label/label.component';
import { LinkComponent } from './link/link.component';
import { BarcodeComponent } from './barcode/barcode.component';

export const CONTROL = {
    'text': TextComponent,
    'select': SelectComponent,
    'textarea': TextareaComponent,
    'radio': RadioComponent,
    'label': LabelComponent,
    'checkbox': CheckboxGroupComponent,
    'editor': EditorComponent,
    'countersign': CountersignComponent,
    'electronic-signature': ElectronicSignatureComponent,
    'detail-layout': DetailLayoutComponent,
    'data-selector': DataSelectorComponent,
    'signature-picture': SignaturePictureComponent,
    'upload': UploadComponent,
    'link': LinkComponent,
    'dynamic-info': DynamicInfoComponent,
    'barcode': BarcodeComponent
};
