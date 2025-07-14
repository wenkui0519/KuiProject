import { Injectable } from '@angular/core';
import { angular } from 'src/app/core/angular-utils'
import { ControlConfigService } from '../utils/service/control-config.service';


@Injectable({
    providedIn: 'root'
})

export class EditorService {
    constructor(
        private controlConfigService: ControlConfigService,
    ) {

    }
}
