import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../../../../store/app.reducers';
import {InputLayerArgs} from './input-layer.model';

@Component({
    selector: 'app-input-layer',
    templateUrl: './input-layer.component.html',
    styleUrls: ['./input-layer.component.scss']
})
export class InputLayerComponent implements OnInit {
    @ViewChild('f') confForm: NgForm;
    @Input() index: number;
    @Input() layer: any;
    @Input() readonly;
    @Output() onSave = new EventEmitter<any>();
    @Output() onCancel = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<any>();

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        setTimeout(
            () => {
                this.confForm.setValue({
                    input_shapeX: this.layer.args.input_shape[0],
                    input_shapeY: this.layer.args.input_shape[1],
                    input_shapeZ: this.layer.args.input_shape[2]
                });
            }
        );
    }

    onSubmit(form: NgForm) {
        const args: InputLayerArgs = {
            input_shape: [form.value.input_shapeX, form.value.input_shapeY, form.value.input_shapeZ],
        };

        this.onSave.emit(args);
    }
}
