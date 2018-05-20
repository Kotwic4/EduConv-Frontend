import {HiddenLayer} from '../hidden-layer.interface';
import {HiddenLayerActivationType} from '../hidden-layer-activation.enum';
import {Conv2DLayerArgs} from './Conv2DLayer';

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
            units: 0
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
