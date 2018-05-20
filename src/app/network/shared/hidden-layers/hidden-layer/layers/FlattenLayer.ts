import {HiddenLayer} from '../hidden-layer.interface';

export class FlattenLayer implements HiddenLayer {
    layer_name: String = 'Flatten';
    args: {};
}
