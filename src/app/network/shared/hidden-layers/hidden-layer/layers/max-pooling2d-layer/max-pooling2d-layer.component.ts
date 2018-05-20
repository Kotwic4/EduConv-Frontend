import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../../../../store/app.reducers';
import {MaxPooling2DLayerArgs} from './max-pooling2d-layer.model';

@Component({
    selector: 'app-max-pooling2d-layer',
    templateUrl: './max-pooling2d-layer.component.html',
    styleUrls: ['./max-pooling2d-layer.component.scss']
})
export class MaxPooling2dLayerComponent implements OnInit {
    @ViewChild('f') confForm: NgForm;
    @Input() index: number;
    @Input() layer: any;
    @Input() readonly;
    @Output() onSave = new EventEmitter<any>();
    @Output() onCancel = new EventEmitter<any>();

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        setTimeout(
            () => {
                this.confForm.setValue({
                    poolX: this.layer.args.pool_size[0],
                    poolY: this.layer.args.pool_size[1],
                    strideX: this.layer.args.strides[0],
                    strideY: this.layer.args.strides[1]
                });
            }
        );
    }

    onSubmit(form: NgForm) {
        const args: MaxPooling2DLayerArgs = {
            pool_size: [form.value.poolX, form.value.poolY],
            strides: [form.value.strideX, form.value.strideY]
        };

        this.onSave.emit(args);
    }
}
