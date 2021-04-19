import { Injectable, Compiler, Component, NgModule, Output } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class EditorService {

    constructor(
        private compiler: Compiler
    ) { }
    attachmentId = 0;
    editorId = 0;
}
