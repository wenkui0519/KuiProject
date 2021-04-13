import { AutofocusModule } from 'shared/directive/autofocus';
import { ErrorImgModule } from 'shared/directive/error-img';
import { ValidatorModule } from 'shared/directive/validator';
import { SafeHtmlModule } from 'shared/pipe/safe-html';
import { SafeResourceModule } from 'shared/pipe/safe-resource';
import { TranslateModule } from 'shared/pipe/translate';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { WatermarkModule } from '@shared/directive/watermark';
import { EuiAreaModule } from '@web-shared/component/area';
import { EuiAttachmentModule } from '@web-shared/component/attachment';
import { EuiCheckboxModule } from '@web-shared/component/checkbox';
import { EuiDatepickerModule } from '@web-shared/component/datepicker';
import { EuiDatetimepickerModule } from '@web-shared/component/datetimepicker';
import { EuiEditorModule } from '@web-shared/component/editor';
import { EuiFilterModule } from '@web-shared/component/filter';
import { EuiImportModule } from '@web-shared/component/import';
import { EuiLoadingModule } from '@web-shared/component/loading';
import { EuiModalModule } from '@web-shared/component/modal';
import { EuiRadioModule } from '@web-shared/component/radio';
import { EuiSearchModule } from '@web-shared/component/search';
import { EuiSelectModule } from '@web-shared/component/select';
import { EuiSelectorModule } from '@web-shared/component/selector';
import { EuiTabsModule } from '@web-shared/component/tabs';
import { EuiTimepickerModule } from '@web-shared/component/timepicker';
import { EuiContentModule } from '@web-shared/directive/content';
import { EuiLoadedModule } from '@web-shared/directive/loaded';
import { EuiMiddleColRightModule } from '@web-shared/directive/middle-col-right';
import { EuiViewerModule } from '@web-shared/directive/viewer';

import { BarcodeComponent } from './barcode/barcode.component';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
//
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CONTROL } from './control';
import { CountersignComponent } from './countersign/countersign.component';
import { DataSelectorComponent } from './data-selector/data-selector.component';
import { DetailLayoutComponent } from './detail-layout/detail-layout.component';
import { DynamicInfoComponent } from './dynamic-info/dynamic-info.component';
import { EditorComponent } from './editor/editor.component';
import { CertModalComponent } from './electronic-signature/cert-modal/cert-modal.component';
import { DataProtectModalComponent } from './electronic-signature/data-protect-modal/data-protect-modal.component';
import { DataProtectViewModalComponent } from './electronic-signature/data-protect-view-modal/data-protect-view-modal.component';
import { DetailViewModalComponent } from './electronic-signature/data-protect-view-modal/detail-view-modal/detail-view-modal.component';
import { ElectronicSignatureComponent } from './electronic-signature/electronic-signature.component';
import { LabelComponent } from './label/label.component';
import { LinkComponent } from './link/link.component';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';
import { SignaturePictureComponent } from './signature-picture/signature-picture.component';
import { TextComponent } from './text/text.component';
import { TextareaComponent } from './textarea/textarea.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        EuiContentModule,
        EuiRadioModule,
        EuiSelectorModule,
        EuiAreaModule,
        EuiSelectModule,
        EuiDatepickerModule,
        EuiDatetimepickerModule,
        EuiTimepickerModule,
        EuiAttachmentModule,
        EuiImportModule,
        EuiEditorModule,
        EuiCheckboxModule,
        EuiMiddleColRightModule,
        AutofocusModule,
        ErrorImgModule,
        ValidatorModule,
        SafeHtmlModule,
        SafeResourceModule,
        TranslateModule,
        ScrollingModule,
        EuiLoadingModule,
        EuiLoadedModule,
        WatermarkModule,
        EuiViewerModule,
        DragDropModule,
        EuiModalModule,
        EuiSearchModule,
        EuiFilterModule,
        EuiTabsModule
    ],
    declarations: [
        CheckboxComponent,
        CountersignComponent,
        DataSelectorComponent,
        DetailLayoutComponent,
        DynamicInfoComponent,
        EditorComponent,
        ElectronicSignatureComponent,
        RadioComponent,
        SelectComponent,
        SignaturePictureComponent,
        TextComponent,
        TextareaComponent,
        UploadComponent,
        CheckboxGroupComponent,
        LabelComponent,
        LinkComponent,
        BarcodeComponent,
        DataProtectModalComponent,
        DataProtectViewModalComponent,
        CertModalComponent,
        DetailViewModalComponent
    ],
    exports: [
        CheckboxComponent,
        CountersignComponent,
        DataSelectorComponent,
        DetailLayoutComponent,
        DynamicInfoComponent,
        EditorComponent,
        ElectronicSignatureComponent,
        RadioComponent,
        SelectComponent,
        SignaturePictureComponent,
        TextComponent,
        TextareaComponent,
        UploadComponent,
        CheckboxGroupComponent,
        LinkComponent,
        BarcodeComponent,
        DragDropModule,
        DataProtectModalComponent,
        DataProtectViewModalComponent,
        CertModalComponent,
        DetailViewModalComponent
    ],
    entryComponents: [
        CheckboxComponent,
        CountersignComponent,
        DataSelectorComponent,
        DetailLayoutComponent,
        DynamicInfoComponent,
        EditorComponent,
        ElectronicSignatureComponent,
        RadioComponent,
        SelectComponent,
        SignaturePictureComponent,
        TextComponent,
        TextareaComponent,
        UploadComponent,
        CheckboxGroupComponent,
        LabelComponent,
        CheckboxGroupComponent,
        LinkComponent,
        BarcodeComponent,
        DataProtectModalComponent,
        DataProtectViewModalComponent,
        CertModalComponent
    ]
})
export class ControlModule { }
