import {HiddenLayer} from '../hidden-layer.model';

export interface DropoutLayerArgs {
    rate: number;
}

export class DropoutLayer extends HiddenLayer {
    args: DropoutLayerArgs;

    constructor() {
        super();
        this.layer_name = 'Dropout';
        this.args = {
            rate: 0.5
        };
    }

    public setArgs(args: DropoutLayerArgs) {
        this.args = Object.assign(this.args, args);
    }

    public getArgsFromLayer(layer: any) {
        this.args.rate = layer.rate;
    }
}
