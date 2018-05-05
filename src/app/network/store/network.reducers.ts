import * as NetworkActions from './network.actions';
import {HiddenLayerType} from '../hidden-layers/hidden-layer/hidden-layer-type.enum';

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
            const newHiddenLayers = [
                ...state.hiddenLayers
            ];

            newHiddenLayers[action.payload].neurons++;

            return {
                ...state,
                hiddenLayers: newHiddenLayers
            };
        case (NetworkActions.NEURONE_DELETE):
            const newHiddenLayers2 = [
                ...state.hiddenLayers
            ];

            newHiddenLayers2[action.payload.layer].neurons--;

            return {
                ...state,
                hiddenLayers: newHiddenLayers2
            };
        default:
            return state;
    }
}
