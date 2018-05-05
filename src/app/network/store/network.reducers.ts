import * as NetworkActions from './network.actions';
import {HiddenLayerType} from '../hidden-layers/hidden-layer/hidden-layer-type.enum';
import {HIDDEN_LAYER_CHANGE_TYPE} from './network.actions';
import {HIDDEN_LAYER_ADD} from './network.actions';

export interface State {
    inputImage: String;
    uploadedNetwork: String;
    labels: String[];
    results: Number[];
    hiddenLayers: {
        type: HiddenLayerType,
        neurons: number
    }[];
}

const initialState: State = {
    inputImage: '',
    uploadedNetwork: '',
    labels: [
        'label1',
        'label2'
    ],
    results: [
        0.3,
        0.7
    ],
    hiddenLayers: [
        {
            type: 0,
            neurons: 9
        },

        {
            type: 0,
            neurons: 9
        },

        {
            type: 1,
            neurons: 3
        },

        {
            type: 2,
            neurons: 4
        },

        {
            type: 2,
            neurons: 4
        }
    ]
};

export function networkReducer(state = initialState, action: NetworkActions.NetworkActions) {
    let newHiddenLayers;

    switch (action.type) {
        case (NetworkActions.INPUT_IMAGE_UPLOAD):
            return {
                ...state,
                inputImage: action.payload
            };
        case (NetworkActions.INPUT_IMAGE_DELETE):
            return {
                ...state,
                inputImage: ''
            };
        case (NetworkActions.NETWORK_UPLOAD):
            return {
                ...state,
                uploadedNetwork: action.payload
            };
        case (NetworkActions.NEURONE_ADD):
            newHiddenLayers = [
                ...state.hiddenLayers
            ];

            newHiddenLayers[action.payload].neurons++;

            return {
                ...state,
                hiddenLayers: newHiddenLayers
            };
        case (NetworkActions.NEURONE_DELETE):
            newHiddenLayers = [
                ...state.hiddenLayers
            ];

            newHiddenLayers[action.payload.layer].neurons--;

            return {
                ...state,
                hiddenLayers: newHiddenLayers
            };
        case (NetworkActions.HIDDEN_LAYER_ADD):
            newHiddenLayers = [
                ...state.hiddenLayers
            ];

            newHiddenLayers.push({
                type: 0,
                neurons: 0
            });

            return {
                ...state,
                hiddenLayers: newHiddenLayers
            };
        case (NetworkActions.HIDDEN_LAYER_CHANGE_TYPE):
            newHiddenLayers = [
                ...state.hiddenLayers
            ];

            newHiddenLayers[action.payload.index].type = action.payload.type;

            return {
                ...state,
                hiddenLayers: newHiddenLayers
            };
        default:
            return state;
    }
}
