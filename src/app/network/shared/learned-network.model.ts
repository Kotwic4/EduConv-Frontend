import * as tf from '@tensorflow/tfjs';
import {HiddenLayerType} from './hidden-layers/hidden-layer/hidden-layer-type.enum';

export class LearnedNetwork {
    private _id = 101;
    private _layers = [];
    private _labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    private _inputShape = [-1, 28, 28, 1];
    private _input;
    private _model: tf.Sequential;
    private _images = [];

    constructor() {

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

    get images(): any[] {
        return this._images;
    }

    static mapLayerNameToEnum(name): HiddenLayerType {
        const trueName = name.split('_').slice(0, name.split('_').length - 1).join('');
        switch (trueName) {
            case 'conv2d':
                return HiddenLayerType.Conv2D;
            case 'maxpooling2d':
                return HiddenLayerType.MaxPooling2D;
            case 'dropout':
                return HiddenLayerType.Dropout;
            case 'flatten':
                return HiddenLayerType.Flatten;
            case 'dense':
                return HiddenLayerType.Dense;
        }
        return HiddenLayerType.Dense;
    }

    static getLayerInfo(layer) {
        const type = LearnedNetwork.mapLayerNameToEnum(layer.name);
        let neurones = 0;
        if (layer.output instanceof tf.SymbolicTensor) {
            neurones = layer.output.shape.slice(-1)[0];
        }
        return {
            type: type,
            neurons: neurones
        };
    }

    loadModel() {
        const data = tf.loadModel('http://127.0.0.1:5000/model/' + this._id + '/model.json');
        return data.then(
            (model: tf.Sequential) => {
                this._model = model;
                this._layers = model.layers.map(LearnedNetwork.getLayerInfo);
                return this;
            }
        );
    }

    generateImage(out) {
        const result = [];
        const shape = out.shape;
        const data = Array.from(out.dataSync());
        if (shape.length === 2) {
            for (let i = 0; i < shape[1]; i++) {
                // create image 1x1 of element data[i]
                result.push(data[i]);
            }
        } else {
            const x = shape[1];
            const y = shape[2];
            for (let n = 0; n < shape[1]; n++) {
                const image = [];
                // create image X x Y
                for (let i = 0; i < x; i++) {
                    const row = [];
                    for (let j = 0; j < y; j++) {
                        // crete rectangle from (i,j) to (i+1,j+1)
                        const index = i * n + j;
                        row.push(data[index]);
                    }
                    image.push(row);
                }
                result.push(image);
            }
        }

        console.log(result);
        return result;
    }

    runModel() {
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
        this._images = images;
        return Array.from(out.dataSync());
    }

    run() {
        return new Promise(
            (resolve, reject) => {
                let result: any = null;
                tf.tidy(
                    () => {
                        result = this.runModel();
                    }
                );
                resolve(result);
            }
        );
    }
}
