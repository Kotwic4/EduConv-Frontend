import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../../../../store/app.reducers';
import {DropoutLayerArgs} from './dropout-layer.model';

@Component({
    selector: 'app-dropout-layer',
    templateUrl: './dropout-layer.component.html',
    styleUrls: ['./dropout-layer.component.scss']
})
export class DropoutLayerComponent implements OnInit {
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
                    rate: this.layer.args.rate
                });

                this.valid.emit(this.confForm.valid);
            }
        );
    }

    onSubmit(form: NgForm) {
        const args: DropoutLayerArgs = {
            rate: form.value.rate
        };

        this.onSave.emit(args);
    }
}
