import {Component, Input, OnInit} from '@angular/core';
import * as NetworkActions from '../../store/network.actions';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {MatDialog} from '@angular/material';
import {InputDrawComponent} from './input-draw/input-draw.component';

@Component({
    selector: 'app-input-layer',
    templateUrl: './input-layer.component.html',
    styleUrls: ['./input-layer.component.scss']
})
export class InputLayerComponent implements OnInit {
    @Input() image;

    constructor(
        private store: Store<fromApp.AppState>,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {}

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
