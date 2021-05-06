import { Component, Input, OnInit, OnChanges, SimpleChange, ChangeDetectorRef } from '@angular/core';
import { AttributeService } from '../../service/attribute.service';

@Component({
    selector: 'control-font-size',
    templateUrl: './font-size.component.html',
    styleUrls: ['./font-size.component.scss']
})
export class FontSizeComponent implements OnInit {
    @Input() attribute: object;

    public fontSize: string;

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
    public fontSizeList: string[];
    ngOnInit() {
        this.fontSizeList = this.BASE_SETTINGS()['fontSize'];
        this.setFontSize();
    }
    public setFontSize() {
        this.fontSize = this.attributeService.get(this.attribute, 'font-size', 'style');
        if (this.fontSizeList.indexOf(this.fontSize) === -1) {
            this.fontSize = '12px';
        }
    }

    public changeFontSize() {
        this.attributeService.set(this.attribute, 'font-size', this.fontSize, 'style');
        this.ref.detectChanges();
    }

}
