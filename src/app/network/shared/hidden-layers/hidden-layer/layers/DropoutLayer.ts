import {HiddenLayer} from '../hidden-layer.interface';
import {Conv2DLayerArgs} from './Conv2DLayer';

export interface DropoutLayerArgs {
    rate: number;
}

export class DropoutLayer extends HiddenLayer {
    layer_name: String = 'Dropout';
    args: DropoutLayerArgs;

    public setArgs(args: DropoutLayerArgs) {
        this.args = args;
    }
}
