import {Component, Input} from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../store/app.reducers';
import * as NetworkActions from '../../../store/network.actions';
import {InputDrawComponent} from '../input-draw/input-draw.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-input-image',
    templateUrl: './input-image.component.html',
    styleUrls: ['./input-image.component.scss']
})
export class InputImageComponent {
    @Input() image;
    @Input() dataset: string;

    constructor(
        private store: Store<fromApp.AppState>,
        public dialog: MatDialog
    ) {}

    onImageChange(event, input) {
        if (event.target.files && event.target.files[0]) {
            this.store.dispatch(new NetworkActions.InputImageUpload(event.target.files[0]));
            input.value = '';
        }
    }

    onImageDelete(event, input) {
        input.value = '';
        this.store.dispatch(new NetworkActions.InputImageDelete());
        event.stopPropagation();
    }

    drawIt() {
        const dialogRef = this.dialog.open(InputDrawComponent, {
            hasBackdrop: true
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.store.dispatch(new NetworkActions.InputImageUploadSuccess(result));
            }
        });
    }
}
