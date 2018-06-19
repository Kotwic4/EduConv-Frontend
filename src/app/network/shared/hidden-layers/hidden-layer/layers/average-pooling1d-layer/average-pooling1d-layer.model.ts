import {HiddenLayer} from '../hidden-layer.model';

export interface AveragePooling1DLayerArgs {
    pool_size?: number;
    strides?: number;
}

export class AveragePooling1DLayer extends HiddenLayer {
    args: AveragePooling1DLayerArgs;

    constructor() {
        super();
        this.layer_name = 'AveragePooling1D';
        this.args = {
            pool_size: null,
            strides: null,
        };
    }

    public setArgs(args: AveragePooling1DLayerArgs) {
        this.args = args;
    }
}
