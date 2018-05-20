import {HiddenLayer} from '../hidden-layer.interface';
import {Conv2DLayerArgs} from './Conv2DLayer';

export interface MaxPooling2DLayerArgs {
    pool_size?: [number, number];
    strides?: [number, number];
}

export class MaxPooling2DLayer extends HiddenLayer {
    layer_name: String = 'MaxPooling2D';
    args: MaxPooling2DLayerArgs;

    public setArgs(args: MaxPooling2DLayerArgs) {
        this.args = args;
    }
}
