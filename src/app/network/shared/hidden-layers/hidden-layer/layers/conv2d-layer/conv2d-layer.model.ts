import {HiddenLayerActivationType} from '../hidden-layer-activation.enum';
import {HiddenLayer} from '../hidden-layer.model';

export interface Conv2DLayerArgs {
    filters: number;
    kernel_size: [number, number];
    strides?: [number, number];
    activation?: HiddenLayerActivationType;
}

export class Conv2DLayer extends HiddenLayer {
    args: Conv2DLayerArgs;

    constructor() {
        super();
        this.layer_name = 'Conv2D';
        this.args = {
            filters: 0,
            kernel_size: [0, 0],
            strides: [null, null],
            activation: null
        };
        this.setHaveNeurons(true);
    }

    public setArgs(args: Conv2DLayerArgs) {
        this.args = args;
        super.setNeurons(args.filters);
    }

    public setNeurons(number: number): void {
        this.args.filters = number;
        super.setNeurons(number);
    }
}
