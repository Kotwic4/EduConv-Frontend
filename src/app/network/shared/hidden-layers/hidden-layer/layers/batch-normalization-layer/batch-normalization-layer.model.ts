import {HiddenLayer} from '../hidden-layer.model';

export interface BatchNormalizationLayerArgs {
    axis?: number;
    momentum?: number;
    epsilon?: number;
}

export class BatchNormalizationLayer extends HiddenLayer {
    args: BatchNormalizationLayerArgs;

    constructor() {
        super();
        this.layer_name = 'BatchNormalization';
        this.args = {
            axis: null,
            momentum: null,
            epsilon: null,
        };
    }

    public setArgs(args: BatchNormalizationLayerArgs) {
        this.args = args;
    }

    public getArgsFromLayer(layer: any) {
        this.args.axis = layer.axis;
        this.args.momentum = layer.momentum;
        this.args.epsilon = layer.epsilon;
    }
}
