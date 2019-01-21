import {HiddenLayerActivationType} from '../hidden-layer-activation.enum';
import {HiddenLayer} from '../hidden-layer.model';

export interface ActivationLayerArgs {
    activation: HiddenLayerActivationType;
}

export class ActivationLayer extends HiddenLayer {
    args: ActivationLayerArgs;

    constructor() {
        super();
        this.layer_name = 'Activation';
        this.args = {
            activation: HiddenLayerActivationType.LINEAR,
        };
    }

    public setArgs(args: ActivationLayerArgs) {
        this.args = Object.assign(this.args, args);
    }

    public getArgsFromLayer(layer: any) {
        this.args.activation = layer.getConfig().activation;
    }
}
