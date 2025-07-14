import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function displayConditionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        control.disable();
        return null;
    };
}
