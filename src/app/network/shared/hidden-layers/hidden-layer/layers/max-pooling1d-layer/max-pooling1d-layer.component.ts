import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../../../../store/app.reducers';
import {MaxPooling1DLayerArgs} from './max-pooling1d-layer.model';

@Component({
    selector: 'app-max-pooling1d-layer',
    templateUrl: './max-pooling1d-layer.component.html',
    styleUrls: ['./max-pooling1d-layer.component.scss']
})
export class MaxPooling1dLayerComponent implements OnInit {
    @ViewChild('f') confForm: NgForm;
    @Input() index: number;
    @Input() layer: any;
    @Input() readonly;
    @Output() onSave = new EventEmitter<any>();
    @Output() onCancel = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<any>();
    @Output() valid = new EventEmitter<boolean>();

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        setTimeout(
            () => {
                this.confForm.setValue({
                    pool: this.layer.args.pool_size,
                    stride: this.layer.args.strides,
                });

                this.valid.emit(this.confForm.valid);
            }
        );
    }

    onSubmit(form: NgForm) {
        const args: MaxPooling1DLayerArgs = {
            pool_size: form.value.pool,
            strides: form.value.stride,
        };

        this.onSave.emit(args);
    }
}
