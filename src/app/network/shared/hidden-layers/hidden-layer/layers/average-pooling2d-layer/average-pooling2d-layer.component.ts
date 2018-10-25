import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../../../../store/app.reducers';
import {AveragePooling2DLayerArgs} from './average-pooling2d-layer.model';

@Component({
    selector: 'app-average-pooling2d-layer',
    templateUrl: './average-pooling2d-layer.component.html',
    styleUrls: ['./average-pooling2d-layer.component.scss']
})
export class AveragePooling2dLayerComponent implements OnInit {
    @ViewChild('f') confForm: NgForm;
    @Input() index: number;
    @Input() layer: any;
    @Input() readonly;
    @Output() onSave = new EventEmitter<any>();
    @Output() onCancel = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<any>();
    @Output() valid = new EventEmitter<boolean>();

    constructor(private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {
        setTimeout(
            () => {
                this.confForm.setValue({
                    poolX: this.layer.args.pool_size[0],
                    poolY: this.layer.args.pool_size[1],
                    strideX: this.layer.args.strides[0],
                    strideY: this.layer.args.strides[1]
                });

                if (this.readonly) {
                    this.valid.emit(true);
                }
                else {
                    this.valid.emit(this.confForm.valid);
                }
            }
        );
    }

    onSubmit(form: NgForm) {
        const args: AveragePooling2DLayerArgs = {
            pool_size: [form.value.poolX, form.value.poolY],
            strides: [form.value.strideX, form.value.strideY]
        };

        this.onSave.emit(args);
    }
}
