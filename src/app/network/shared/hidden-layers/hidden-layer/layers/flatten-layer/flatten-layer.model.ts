import {HiddenLayer} from '../hidden-layer.model';

export class FlattenLayer extends HiddenLayer {
    layer_name: String = 'Flatten';
    args: {};

    public setArgs(args: {}) {
        this.args = args;
    }
}
