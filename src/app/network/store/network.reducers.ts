import * as NetworkActions from './network.actions';
import {HiddenLayerType} from '../shared/hidden-layers/hidden-layer/hidden-layer-type.enum';
import {HIDDEN_LAYER_CHANGE_POSITION, LearnNetwork} from './network.actions';
import {Network} from '../shared/network.model';
import {NetworkOutput} from '../shared/network-output.model';
import {LearnedNetwork} from '../shared/learned-network.model';

export interface State {
    inputImage: String;
    uploadedNetwork: String;
    labels: String[];
    results: Number[];
    hiddenLayers: {
        type: HiddenLayerType,
        neurons: number
    }[];
    networkInUsage: Network | LearnedNetwork;
    networkRunResult: NetworkOutput;
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
            neurons: 10
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
    ],
    networkInUsage: null,
    networkRunResult: null
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
        case (NetworkActions.HIDDEN_LAYER_CHANGE_POSITION):
            newHiddenLayers = [
                ...state.hiddenLayers
            ];

            newHiddenLayers.splice(action.payload.newIndex, 0, newHiddenLayers.splice(action.payload.oldIndex, 1)[0]);

            return {
                ...state,
                hiddenLayers: newHiddenLayers
            };
        case (NetworkActions.START_MODELING_NETWORK):
            return {
                ...state,
                networkInUsage: new Network()
            };
        case (NetworkActions.END_MODELING_NETWORK):
            return {
                ...state,
                networkInUsage: action.payload
            };
        case (NetworkActions.START_LEARNING_NETWORK):
            return {
                ...state,
                networkInUsage: action.payload
            };
        case (NetworkActions.END_LEARNING_NETWORK):
            return {
                ...state,
                networkInUsage: action.payload
            };
        case (NetworkActions.START_RUNNING_NETWORK):
            return {
                ...state,
                networkInUsage: action.payload
            };
        case (NetworkActions.END_RUNNING_NETWORK):
            return {
                ...state,
                networkRunResult: action.payload
            };
        default:
            return state;
    }
}
