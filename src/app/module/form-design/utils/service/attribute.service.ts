import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AttributeService {
    constructor() { }
    public controlCount: number;

    set(element, attrName, attrValue, type?) {
        if (element instanceof jQuery) {
            switch (type) {
                case 'style':
                    element['css'](attrName, attrValue)
                    break;
                default:
                    element['attr'](attrName, attrValue);
                    break;
            }
        }
    }

    get(element, attrName, type?) {
        let result;
        if (element instanceof jQuery) {
            switch (type) {
                case 'style':
                    result = element['css'](attrName)
                    break;
                default:
                    result = element['attr'](attrName);
                    break;
            }
        }
        return result;
    }
}