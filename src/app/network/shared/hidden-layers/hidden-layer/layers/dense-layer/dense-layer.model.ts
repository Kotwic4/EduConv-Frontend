import {HiddenLayerActivationType} from '../hidden-layer-activation.enum';
import {HiddenLayer} from '../hidden-layer.model';

export interface DenseLayerArgs {
    units: number;
    activation?: HiddenLayerActivationType;
    use_bias?: Boolean;
}

export class DenseLayer extends HiddenLayer {
    args: DenseLayerArgs;

    constructor() {
        super();
        this.layer_name = 'Dense';
        this.args = {
            units: 0,
            activation: null,
            use_bias: true
        };
        this.setHaveNeurons(true);
    }

    public setArgs(args: DenseLayerArgs) {
        this.args = Object.assign(this.args, args);
        super.setNeurons(args.units);
    }

    public setNeurons(number: number): void {
        this.args.units = number;
        super.setNeurons(number);
    }

    public getArgsFromLayer(layer: any) {
        this.args.units = layer.units;
        this.args.use_bias = layer.useBias || true;
        this.args.activation = layer.activation.name || null;
    }
}
