import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../../../../store/app.reducers';
import {Subscription} from 'rxjs/Subscription';
import {HiddenLayerActivationType} from '../../hidden-layer-activation.enum';
import * as _ from 'lodash';
import {NgForm} from '@angular/forms';
import {HiddenLayerChangeArgs} from '../../../../../store/network.actions';
import {Conv2DLayerArgs} from '../Conv2DLayer';

@Component({
    selector: 'app-conv2d-layer',
    templateUrl: './conv2d-layer.component.html',
    styleUrls: ['./conv2d-layer.component.scss']
})
export class Conv2dLayerComponent implements OnInit, OnDestroy {
    @ViewChild("f") confForm: NgForm;
    @Input() index: number;
    @Input() readonly;
    layer: any;
    subscription: Subscription;
    activation_types_names: string[];
    activation_types_values: string[];


    constructor(
        private store: Store<fromApp.AppState>
    ) {
        this.activation_types_names = Object.keys(HiddenLayerActivationType).filter(k => typeof HiddenLayerActivationType[k as any] === 'string');
        this.activation_types_values = this.activation_types_names.map(k => HiddenLayerActivationType[k as any]);
    }

    ngOnInit() {
        this.subscription = this.store.select('network')
            .subscribe(
                data => {
                    this.layer = _.cloneDeep(data.networkInUsage.layers[this.index]);
                    console.log(this.layer);

                    setTimeout(
                        () => {
                            this.confForm.setValue({
                                kernelX: this.layer.args.kernel_size[0],
                                kernelY: this.layer.args.kernel_size[1],
                                strideX: this.layer.args.strides[0],
                                strideY: this.layer.args.strides[1],
                                activation: this.layer.args.activation,
                            });
                        }
                    );

                }
            );
    }

    onSubmit(form: NgForm) {
        const args: Conv2DLayerArgs = {
            filters: this.layer.args.filters,
            kernel_size: [form.value.kernelX, form.value.kernelY],
            strides: [form.value.stridesX, form.value.stridesY],
            activation: form.value.activation
        };

        this.store.dispatch(new HiddenLayerChangeArgs({
            index: this.index,
            args: args
        }));
    }

    onCancel() {

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
