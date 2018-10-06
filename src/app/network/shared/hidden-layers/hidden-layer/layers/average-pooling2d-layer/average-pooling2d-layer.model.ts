import {HiddenLayer} from '../hidden-layer.model';


export interface AveragePooling2DLayerArgs {
    pool_size?: [number, number];
    strides?: [number, number];
}

export class AveragePooling2DLayer extends HiddenLayer {
    args: AveragePooling2DLayerArgs;

    constructor() {
        super();
        this.layer_name = 'AveragePooling2D';
        this.args = {
            pool_size: [null, null],
            strides: [null, null],
        };
    }

    public setArgs(args: AveragePooling2DLayerArgs) {
        this.args = args;
    }

    public getArgsFromLayer(layer: any) {
        this.args.pool_size = layer.poolSize;
        this.args.strides = layer.strides;
    }
}
