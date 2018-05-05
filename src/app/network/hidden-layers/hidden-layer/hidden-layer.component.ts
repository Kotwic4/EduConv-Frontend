import {Component, Input, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';

import * as NetworkActions from '../../store/network.actions';
import * as fromApp from '../../../store/app.reducers';

@Component({
    selector: 'app-hidden-layer',
    templateUrl: './hidden-layer.component.html',
    styleUrls: ['./hidden-layer.component.scss']
})
export class HiddenLayerComponent implements OnInit {
    @Input() layer;
    @Input() index: number;

    constructor(private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {
    }

    range(i: number) {
        return new Array(i);
    }

    onNeuroneAdd() {
        console.log('Add neurone');
        this.store.dispatch(new NetworkActions.NeuroneAdd(this.index));
    }

    onNeuroneDelete(i: number) {
        console.log('Delete neurone ' + i);
        this.store.dispatch(new NetworkActions.NeuroneDelete({
            layer: this.index,
            neurone: i
        }));
    }
}
