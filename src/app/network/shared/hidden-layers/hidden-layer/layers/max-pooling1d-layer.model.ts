import {HiddenLayer} from './hidden-layer.model';

export interface MaxPooling1DLayerArgs {
    pool_size?: number;
    strides?: number;
}

export class MaxPooling1DLayer extends HiddenLayer {
    args: MaxPooling1DLayerArgs;

    constructor() {
        super();
        this.layer_name = 'MaxPooling1D';
        this.args = {};
    }

    public setArgs(args: MaxPooling1DLayerArgs) {
        this.args = args;
    }
}
