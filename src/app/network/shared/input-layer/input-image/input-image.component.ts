import {Component, Input, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../store/app.reducers';
import * as NetworkActions from '../../../store/network.actions';

@Component({
    selector: 'app-input-image',
    templateUrl: './input-image.component.html',
    styleUrls: ['./input-image.component.scss']
})
export class InputImageComponent {
    @Input() image;
    @ViewChild('imageInput') imageInput;

    constructor(private store: Store<fromApp.AppState>) {}

    onImageChange(fileInput) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            const self = this;
            const reader = new FileReader();

            reader.onload = function(e: any) {
                self.store.dispatch(new NetworkActions.InputImageUpload(e.target.result));
            };

            reader.readAsDataURL(fileInput.target.files[0]);
        }
    }

    onImageDelete(event) {
        this.imageInput.nativeElement.value = '';
        this.store.dispatch(new NetworkActions.InputImageDelete());
        event.stopPropagation();
    }
}
