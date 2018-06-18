import {HiddenLayer} from './hidden-layer.model';

export interface BatchNormalizationLayerArgs {
    axis?: number;
}

export class BatchNormalizationLayer extends HiddenLayer {
    args: BatchNormalizationLayerArgs;

    constructor() {
        super();
        this.layer_name = 'BatchNormalization';
        this.args = {};
    }

    public setArgs(args: BatchNormalizationLayerArgs) {
        this.args = args;
    }
}
