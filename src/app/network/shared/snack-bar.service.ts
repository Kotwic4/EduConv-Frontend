import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

export enum SnackBarType {
    SUCCESS,
    WARNING,
    ERROR,
    INFO,
}

@Injectable()
export class SnackBarService {
    constructor(
        public snackBar: MatSnackBar,
    ) {

    }

    public open(type: SnackBarType, message: string) {
        this.snackBar.open(message, '', {
            duration: 3000,
            panelClass: this._getClass(type),
        });
    }

    private _getClass(type: SnackBarType) {
        switch (type) {
            case SnackBarType.SUCCESS:
                return 'snack-bar--success';

            case SnackBarType.WARNING:
                return 'snack-bar--warning';

            case SnackBarType.ERROR:
                return 'snack-bar--error';

            case SnackBarType.INFO:
                return 'snack-bar--dataset-info';

            default:
                return '';
        }
    }
}
