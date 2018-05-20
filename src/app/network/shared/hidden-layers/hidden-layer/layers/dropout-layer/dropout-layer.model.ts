import {HiddenLayer} from '../hidden-layer.model';

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
