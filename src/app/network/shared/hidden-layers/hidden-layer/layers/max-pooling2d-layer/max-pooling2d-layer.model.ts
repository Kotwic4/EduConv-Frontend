import {HiddenLayer} from '../hidden-layer.model';

export interface MaxPooling2DLayerArgs {
    pool_size?: [number, number];
    strides?: [number, number];
}

export class MaxPooling2DLayer extends HiddenLayer {
    layer_name: String = 'MaxPooling2D';
    args: MaxPooling2DLayerArgs;

    constructor() {
        super();

        this.args = {
            pool_size: [null, null],
            strides: [null, null]
        };
    }

    public setArgs(args: MaxPooling2DLayerArgs) {
        this.args = args;
    }
}
