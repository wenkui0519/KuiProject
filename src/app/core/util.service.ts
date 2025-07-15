import { angular } from './angular-utils';
import { Observable } from 'rxjs';

import {
    Injectable,
    NgZone
} from '@angular/core';
import { Title } from '@angular/platform-browser';


declare var moxie: any;

@Injectable({
    providedIn: 'root'
})
export class UtilService {
    // 全局方法
    private globalMethodMap: { [key: string]: { isRunOutAngular: boolean; method: Function } };

    constructor(
        private titleService: Title,
    ) {
        this.globalMethodMap = {};
    }
    createRandomId(uidMap: Record<string, any>) {
        let uid: string;
        while (true) {
            uid = Math.random().toString().substring(12);
            if (!Reflect.has(uidMap, uid)) {
                break;
            }
        }
        return uid;
    }

    setBrowserTitle(pageTitle: string) {
        if (pageTitle) {
            this.titleService.setTitle(pageTitle);
        }
    }

}
