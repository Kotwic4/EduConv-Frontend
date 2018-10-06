import {HiddenLayer} from '../hidden-layer.model';

export interface MaxPooling2DLayerArgs {
    pool_size?: [number, number];
    strides?: [number, number];
}

export class MaxPooling2DLayer extends HiddenLayer {
    args: MaxPooling2DLayerArgs;

    constructor() {
        super();
        this.layer_name = 'MaxPooling2D';
        this.args = {
            pool_size: [null, null],
            strides: [null, null],
        };
    }

    public setArgs(args: MaxPooling2DLayerArgs) {
        this.args = Object.assign(this.args, args);
    }

    public getArgsFromLayer(layer: any) {
        this.args.pool_size = layer.poolSize || [null, null];
        this.args.strides = layer.strides || [null, null];
    }
}
