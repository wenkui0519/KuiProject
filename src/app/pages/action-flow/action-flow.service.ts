import { Observable, Subject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable()
export class ActionFlowOutSideService {

    private handler$: Subject<any>;

    constructor(
    ) {
        this.handler$ = new Subject();
    }
    // 保存动作流
    save() {
        return new Observable(observer => {
            this.handler$.next({
                callback(result: any) {
                    observer.next(result);
                    observer.complete();
                },
            });
        });
    }

    /** 内部方法，请勿调用 */
    getHandler() {
        return this.handler$;
    }
}
