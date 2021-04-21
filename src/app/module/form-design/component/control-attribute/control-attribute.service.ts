import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn:'root'
})

export class ControlAttributeService {
    // 控件属性列表
    setAttributes$: BehaviorSubject<any>;
    // 控件实体
    setAttributeValue$: BehaviorSubject<any>;
    constructor() {
        this.setAttributes$ = new BehaviorSubject(0);
        this.setAttributeValue$ = new BehaviorSubject(0);
    }
}
