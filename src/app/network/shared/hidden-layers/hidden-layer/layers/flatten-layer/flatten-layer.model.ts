import {HiddenLayer} from '../hidden-layer.model';

export class FlattenLayer extends HiddenLayer {
    args: {};

    constructor() {
        super();
        this.layer_name = 'Flatten';
        this.args = {};
    }

    public setArgs(args: {}) {
        this.args = args;
    }
}
