import { Injectable } from "@angular/core";
import { angular } from "src/app/core/angular-utils";

@Injectable({
    providedIn: 'root'
})

export class AttributeService {
    constructor() { }

    public get(control, path) {
        let result = control;
        path = path.split('.');
        angular.forEach(path, (key) => {
            result = result[key];
        });
        return result;
    }
    public set(control, path, value) {
        let result = control;
        path = path.split('.');
        angular.forEach(path, (key,) => {
            result = result[key] || value;
        });
    }
}