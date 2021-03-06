import {HiddenLayerActivationType} from '../hidden-layer-activation.enum';
import {HiddenLayer} from '../hidden-layer.model';

export interface Conv2DLayerArgs {
    filters: number;
    activation: HiddenLayerActivationType;
    kernel_size: [number, number];
    strides?: [number, number];
}

export class Conv2DLayer extends HiddenLayer {
    args: Conv2DLayerArgs;

    constructor() {
        super();
        this.layer_name = 'Conv2D';
        this.args = {
            filters: 1,
            kernel_size: [1, 1],
            strides: [null, null],
            activation: HiddenLayerActivationType.LINEAR,
        };
        this.setNeurons(1);
        this.setHaveNeurons(true);
    }

    public setArgs(args: Conv2DLayerArgs) {
        this.args = Object.assign(this.args, args);
        super.setNeurons(args.filters);
    }

    public setNeurons(number: number): void {
        this.args.filters = number;
        super.setNeurons(number);
    }

    public getArgsFromLayer(layer: any) {
        this.args.filters = layer.filters;
        this.args.kernel_size = layer.kernelSize;
        this.args.strides = layer.strides || [null, null];
        this.args.activation = layer.getConfig().activation;
    }
}
