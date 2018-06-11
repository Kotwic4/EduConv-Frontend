import * as tf from '@tensorflow/tfjs';
import {HiddenLayersService} from './hidden-layers/hidden-layer/layers/hidden-layer.service';
import {API_URL} from '../network.consts';
import {HiddenLayer} from './hidden-layers/hidden-layer/layers/hidden-layer.model';
import {NetworkOutput} from './network-output.model';

export class LearnedNetwork {
    private _id;
    private _layers: HiddenLayer[] = [];
    private _labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    private _inputShape = [-1, 28, 28, 1];
    private _input;
    private _model: tf.Sequential;
    private hiddenLayersService: HiddenLayersService;

    constructor() {
        this.hiddenLayersService = new HiddenLayersService();
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get layers() {
        return this._layers;
    }

    set layers(value) {
        this._layers = value;
    }

    get labels() {
        return this._labels;
    }

    set labels(value) {
        this._labels = value;
    }

    get input() {
        return this._input;
    }

    set input(value) {
        this._input = value;
    }

    get inputShape(): number[] {
        return this._inputShape;
    }

    set inputShape(value: number[]) {
        this._inputShape = value;
    }

    loadModel() {
        const data = tf.loadModel(API_URL + 'model/' + this._id + '/file/model.json');

        return data.then(
            (model: tf.Sequential) => {
                this._model = model;
                this._layers = model.layers.map(this._getLayerInfo.bind(this));

                return this;
            }
        );
    }

    generateImage(out) {
        const canvas = <HTMLCanvasElement>document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const result = [];
        const shape = out.shape;
        const data = Array.from(out.dataSync());
        const _min: any = Math.min.apply(null, data);
        const _max: any = Math.max.apply(null, data);
        const conf = (_max - _min) / 255;

        if (shape.length === 2) {
            for (let i = 0; i < shape[1]; i++) {
                const value: any = data[i];
                const color = (value - _min) / conf;

                canvas.width  = 1;
                canvas.height = 1;
                ctx.fillStyle = `rgb(${color},${color},${color})`;
                ctx.fillRect(0, 0, 1, 1);
                result.push(canvas.toDataURL());
            }
        }
        else {
            const x = shape[1];
            const y = shape[2];
            const z = shape[3];

            for (let n = 0; n < z; n++) {
                canvas.width  = x;
                canvas.height = y;

                for (let i = 0; i < x; i++) {
                    for (let j = 0; j < y; j++) {
                        const index = n + (i * z) + (j * z * x);
                        const value: any = data[index];
                        const color = (value - _min) / conf;
                        ctx.fillStyle = `rgb(${color},${color},${color})`;
                        ctx.fillRect(i, j, i + 1, j + 1);
                    }
                }

                result.push(canvas.toDataURL());
            }
        }

        return result;
    }

    runModel(): NetworkOutput {
        const img = new Image();
        img.src = this.input;

        const images = [];
        const croppedImage = tf.fromPixels(img, 1);
        const batchedImage = croppedImage.expandDims(0).toFloat();
        const reshaped = batchedImage.reshape(this._inputShape);
        let inp: any = reshaped;
        let out: any = reshaped;

        for (let i = 0; i < this._model.layers.length; i++) {
            const layer = this._model.getLayer('', i);
            out = layer.apply(inp);
            images.push(this.generateImage(out));
            inp = out;
        }

        return new NetworkOutput(
            images,
            Array.from(out.dataSync())
        );
    }

    run(): Promise<NetworkOutput> {
        return new Promise(
            (resolve, reject) => {
                tf.tidy(
                    () => {
                        resolve(this.runModel());
                    }
                );
            }
        );
    }

    private _getLayerInfo(layer) {
        const trueName = layer.name.split('_').slice(0, layer.name.split('_').length - 1).join('');
        const type = this.hiddenLayersService.getTypeByName(trueName);

        if (type === null) {
            throw new Error('Unrecognized layer type.');
        }

        let neurones = 0;
        if (layer.output instanceof tf.SymbolicTensor) {
            neurones = layer.output.shape.slice(-1)[0];
        }

        const layerInfo = this.hiddenLayersService.getInstance(type);
        layerInfo.setNeurons(neurones);
        layerInfo.setHaveNeurons(true);

        return layerInfo;
    }
}
