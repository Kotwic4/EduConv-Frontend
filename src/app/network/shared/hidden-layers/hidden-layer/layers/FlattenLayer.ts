import {HiddenLayer} from '../hidden-layer.interface';
import {Conv2DLayerArgs} from './Conv2DLayer';

export class FlattenLayer extends HiddenLayer {
    layer_name: String = 'Flatten';
    args: {};

    public setArgs(args: {}) {
        this.args = args;
    }
}
