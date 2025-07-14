import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { displayConditionValidator } from './display-condition';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'test18';

  constructor(
    private notification: NzNotificationService,
  ) {

  }

  public form: FormGroup = new FormGroup({});

  graphConfig = {
    enableConnect: (source, target) => {
      if (source.type === 'FlowEnd' && target.type === 'FlowStart') {
        this.notification.create(
          'error',
          '起始节点不能是结束节点',
          '',
        );
        return false;
      }
      if (source.id === target.id) {
        this.notification.create(
          'error',
          '节点不能连接自己',
          '',
        );
        return false;
      }
      return true;
    }
  }

  ngOnInit() {
    this.form.addControl('dateRange', new FormControl('你好'));
    // const validator: any = [];
    // validator.push(displayConditionValidator());
    // this.form.get('dateRange')?.setValidators(validator);
    // this.form.get('dateRange')?.updateValueAndValidity();
    // this.form.get('dateRange')?.statusChanges.subscribe(res => {
    //   console.log(this.form);
    //   console.log(res);
    // });
    this.form.get('dateRange').valueChanges.subscribe(value => {
      console.log('valueChange: ',value);
    });
  }

  plainTextChange(data) {
    console.log('plainTextChange: ', data);
  }

  click() {
    if (this.form.disabled) {
      this.form.enable({ emitEvent: true });
    } else {
      this.form.disable();
    }
  }
}
