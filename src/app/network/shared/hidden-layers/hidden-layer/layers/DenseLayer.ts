import {HiddenLayer} from '../hidden-layer.interface';
import {HiddenLayerActivationType} from '../hidden-layer-activation.type';

export interface DenseLayerArgs {
    units: number;
    activation?: HiddenLayerActivationType;
    use_bias?: Boolean;
}

export class DenseLayer implements HiddenLayer {
    layer_name: String = 'Dense';
    args: DenseLayerArgs;
}
