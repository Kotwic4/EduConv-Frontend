import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromApp from '../../../../store/app.reducers';
import * as NetworkActions from '../../../store/network.actions';
import {LearnedNetwork} from '../../learned-network.model';

@Component({
    selector: 'app-input-image',
    templateUrl: './input-image.component.html',
    styleUrls: ['./input-image.component.scss']
})
export class InputImageComponent implements OnInit, OnDestroy {
    @ViewChild('imageInput') imageInput;
    inputImage: String;
    subscription: Subscription;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.subscription = this.store.select('network')
            .subscribe(
                (data) => {
                    const network = (<LearnedNetwork>data.networkInUsage);

                    if (network) {
                        this.inputImage = network.input;
                    }
                }
            );
    }

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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
