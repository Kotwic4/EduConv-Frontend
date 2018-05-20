import {HiddenLayer} from '../hidden-layer.model';

export interface DropoutLayerArgs {
    rate: number;
}

export class DropoutLayer extends HiddenLayer {
    layer_name: String = 'Dropout';
    args: DropoutLayerArgs;

    constructor() {
        super();

        this.args = {
            rate: 0
        };
    }

    public setArgs(args: DropoutLayerArgs) {
        this.args = args;
    }
}
