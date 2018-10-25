import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class HiddenLayersValidator {
    private validation: boolean[] = [];
    public $valid = new Subject<boolean>();

    constructor() {}

    public addLayer(initValue: boolean) {
        this.validation.push(initValue);
        this.emit();
    }

    public removeLayer(index: number) {
        this.validation.splice(index, 1);
        this.emit();
    }

    public updateValid(index: number, valid: boolean) {
        this.validation[index] = valid;
        this.emit();
    }

    private emit() {
        this.$valid.next(this.validation.reduce((acc, valid) => {
            return acc && valid;
        }, true));
    }
}
