import {Component, Input, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';

import * as NetworkActions from '../store/network.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() controls;
    position = 'below';
    message = 'Here is the tooltip';
    disabled = false;
    showDelay = 0;
    hideDelay = 1000;
    showExtraClass = true;

    constructor(private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {
    }

    onNetworkChange(fileInput) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            const self = this;
            const reader = new FileReader();

            reader.onload = function(e: any) {
                self.store.dispatch(new NetworkActions.NetworkUpload(e.target.result));
            };

            reader.readAsText(fileInput.target.files[0]);
        }
    }
}
