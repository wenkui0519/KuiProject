import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { AttributeService } from '../../service/attribute.service';

@Component({
    selector: 'control-font-family',
    templateUrl: './font-family.component.html',
    styleUrls: ['./font-family.component.scss']
})
export class FontFamilyComponent implements OnInit {
    @Input() attribute: object;

    public fontFamily: string;
    public fontFamilyList: string[];

    constructor(
        public ref: ChangeDetectorRef,
        public attributeService: AttributeService,
    ) {
    }
    BASE_SETTINGS() {
      return {
          'fontSize': ['12px', '14px', '16px', '18px', '20px', '24px', '36px'],
          'fontFamily': [
              '宋体',          // this.trans('flow.simsun'),
              '楷体',          // this.trans('flow.kaiti'),
              '微软雅黑',       // this.trans('flow.microsoft_yahei'),
              '黑体',          // this.trans('flow.simhei'),
              '隶书',          // this.trans('flow.lisu'),
              '仿宋',          // this.trans('flow.fangsong'),
              '宋简体',        // this.trans('flow.songti_sc'),
              'andale mono',
              'arial',
              'arial black',
              'comic sans ms',
              'impact',
              'times new roman'
          ],
      };
  }
    ngOnInit() {
        this.fontFamilyList = this.BASE_SETTINGS()['fontFamily'];
        this.setFontFamily();
    }

    public setFontFamily() {
        this.fontFamily = this.attributeService.get(this.attribute, 'font-family', 'style');
        if (this.fontFamily) {
            this.fontFamily = this.fontFamily.replace(/"/g, '');
        }
        if (this.fontFamilyList.indexOf(this.fontFamily) === -1) {
            this.fontFamily = '雅黑';
        }
    }

    public changeFontFamily() {
        this.attributeService.set(this.attribute, 'font-family', this.fontFamily, 'style');
        this.ref.detectChanges();
    }

}
