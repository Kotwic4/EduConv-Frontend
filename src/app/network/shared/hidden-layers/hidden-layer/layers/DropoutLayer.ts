import {HiddenLayer} from '../hidden-layer.interface';

export interface DropoutLayerArgs {
    rate: number;
}

export class DropoutLayer extends HiddenLayer {
    layer_name: String = 'Dropout';
    args: DropoutLayerArgs;
}
