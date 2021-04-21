import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AttributeService {
    constructor() { }
    public controlCount: number;

    set(element, attrName, attrValue, type?){
        if(element instanceof jQuery){
            return element['attr'](attrName,attrValue);
        }
    }

    get(element, attrName, type?){
        if(element instanceof jQuery){
            return element['attr'](attrName);
        }
    }
}