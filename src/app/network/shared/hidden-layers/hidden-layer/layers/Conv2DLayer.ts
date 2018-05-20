import {HiddenLayer} from '../hidden-layer.interface';
import {HiddenLayerActivationType} from '../hidden-layer-activation.type';

export interface Conv2DLayerArgs {
    filters: number;
    kernel_size: [number, number];
    strides?: [number, number];
    activation?: HiddenLayerActivationType;
}

export class Conv2DLayer implements HiddenLayer {
    layer_name: String = 'Conv2D';
    args: Conv2DLayerArgs;
}
