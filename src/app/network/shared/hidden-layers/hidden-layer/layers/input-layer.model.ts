import {HiddenLayer} from './hidden-layer.model';

export interface InputLayerArgs {
    input_shape?: [number, number, number];
}

export class InputLayer extends HiddenLayer {
    args: InputLayerArgs;

    constructor() {
        super();
        this.layer_name = 'Input';
        this.args = {};
    }

    public setArgs(args: InputLayerArgs) {
        this.args = args;
    }
}
