import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilsAttributeService {
    changeTitle$: EventEmitter<any>;
    changeDisplay$: EventEmitter<any>;
    changeHide$: EventEmitter<any>;
    changeSource$: EventEmitter<any>;
    constructor() {
        this.changeTitle$ = new EventEmitter();
        this.changeDisplay$ = new EventEmitter();
        this.changeHide$ = new EventEmitter();
        this.changeSource$ = new EventEmitter();
    }
}
