import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../../../../store/app.reducers';
import {AveragePooling1DLayerArgs} from './average-pooling1d-layer.model';

@Component({
    selector: 'app-average-pooling1d-layer',
    templateUrl: './average-pooling1d-layer.component.html',
    styleUrls: ['./average-pooling1d-layer.component.scss']
})
export class AveragePooling1dLayerComponent implements OnInit {
    @ViewChild('f') confForm: NgForm;
    @Input() index: number;
    @Input() layer: any;
    @Input() readonly;
    @Output() onSave = new EventEmitter<any>();
    @Output() onCancel = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<any>();

    constructor(private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {
        setTimeout(
            () => {
                this.confForm.setValue({
                    pool: this.layer.args.pool_size,
                    stride: this.layer.args.strides,
                });
            }
        );
    }

    onSubmit(form: NgForm) {
        const args: AveragePooling1DLayerArgs = {
            pool_size: form.value.pool,
            strides: form.value.stride
        };

        this.onSave.emit(args);
    }
}
