import {HiddenLayerActivationType} from '../hidden-layer-activation.enum';
import {HiddenLayer} from '../hidden-layer.model';

export interface DenseLayerArgs {
    units: number;
    activation?: HiddenLayerActivationType;
    use_bias?: Boolean;
}

export class DenseLayer extends HiddenLayer {
    layer_name: String = 'Dense';
    args: DenseLayerArgs;

    constructor() {
        super();

        this.args = {
            units: 0,
            activation: null,
            use_bias: false
        };
    }

    public setArgs(args: DenseLayerArgs) {
        this.args = args;
    }

    public getNeurons(): number {
        return this.args.units;
    }

    public setNeurons(number: number): void {
        this.args.units = number;
    }

    public haveNeurons(): boolean {
        return true;
    }
}
