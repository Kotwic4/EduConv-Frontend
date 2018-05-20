import {HiddenLayer} from '../hidden-layer.interface';

export interface MaxPooling2DLayerArgs {
    pool_size?: [number, number];
    strides?: [number, number];
}

export class MaxPooling2DLayer implements HiddenLayer {
    layer_name: String = 'MaxPooling2D';
    args: MaxPooling2DLayerArgs;
}
