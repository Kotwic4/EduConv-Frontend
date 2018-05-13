import * as NetworkActions from './network.actions';
import {HiddenLayerType} from '../shared/hidden-layers/hidden-layer/hidden-layer-type.enum';
import {HIDDEN_LAYER_CHANGE_POSITION, LearnNetwork} from './network.actions';
import {UnlearnedNetwork} from '../shared/unlearned-network.model';
import {NetworkOutput} from '../shared/network-output.model';
import {LearnedNetwork} from '../shared/learned-network.model';
import {FETCH_UNLEARNED_NETWORK} from './network.actions';

const network = new LearnedNetwork();
network.id = 1;
network.layers = [
    {
        type: 0,
        neurons: 10
    },

    {
        type: 1,
        neurons: 9
    },
];
network.labels = [
    'label1',
    'label2'
];

export interface State {
    uploadedNetwork: String;
    fetchingNetwork: boolean;
    savingNetwork: boolean;
    learningNetwork: boolean;
    runningNetwork: boolean;
    networkInUsage: UnlearnedNetwork | LearnedNetwork;
    networkRunResult: NetworkOutput;
}

const initialState: State = {
    uploadedNetwork: '',
    fetchingNetwork: false,
    savingNetwork: false,
    learningNetwork: false,
    runningNetwork: false,
    networkInUsage: network,
    networkRunResult: null
};

export function networkReducer(state = initialState, action: NetworkActions.NetworkActions) {
    let networkInUsage;

    switch (action.type) {
        case (NetworkActions.INPUT_IMAGE_UPLOAD):
            networkInUsage = <LearnedNetwork>state.networkInUsage;
            networkInUsage.input = action.payload;

            return {
                ...state,
                networkInUsage: networkInUsage
            };
        case (NetworkActions.INPUT_IMAGE_DELETE):
            networkInUsage = <LearnedNetwork>state.networkInUsage;
            networkInUsage.input = null;

            return {
                ...state,
                networkInUsage: networkInUsage
            };
        case (NetworkActions.NETWORK_UPLOAD):
            return {
                ...state,
                uploadedNetwork: action.payload
            };
        case (NetworkActions.NEURONE_ADD):
            networkInUsage = <LearnedNetwork>state.networkInUsage;
            networkInUsage.layers[action.payload].neurons++;

            return {
                ...state,
                networkInUsage: networkInUsage
            };
        case (NetworkActions.NEURONE_DELETE):
            networkInUsage = <LearnedNetwork>state.networkInUsage;
            networkInUsage.layers[action.payload.layer].neurons--;

            return {
                ...state,
                networkInUsage: networkInUsage
            };
        case (NetworkActions.HIDDEN_LAYER_ADD):
            networkInUsage = <LearnedNetwork>state.networkInUsage;
            networkInUsage.layers.push({
                type: 0,
                neurons: 0
            });

            return {
                ...state,
                networkInUsage: networkInUsage
            };
        case (NetworkActions.HIDDEN_LAYER_CHANGE_TYPE):
            networkInUsage = <LearnedNetwork>state.networkInUsage;
            networkInUsage.layers[action.payload.index].type = action.payload.type;

            return {
                ...state,
                networkInUsage: networkInUsage
            };
        case (NetworkActions.HIDDEN_LAYER_CHANGE_POSITION):
            networkInUsage = <LearnedNetwork>state.networkInUsage;

            networkInUsage.layers.splice(action.payload.newIndex, 0, networkInUsage.layers.splice(action.payload.oldIndex, 1)[0]);

            return {
                ...state,
                networkInUsage: networkInUsage
            };
        case (NetworkActions.START_MODELING_NETWORK):
            networkInUsage = new UnlearnedNetwork();
            networkInUsage.id = 1;
            networkInUsage.layers = [
                {
                    type: 0,
                    neurons: 10
                },

                {
                    type: 1,
                    neurons: 9
                },
            ];

            return {
                ...state,
                networkInUsage: networkInUsage,
                savingNetwork: true
            };
        case (NetworkActions.END_MODELING_NETWORK):
            return {
                ...state,
                networkInUsage: action.payload,
                savingNetwork: false
            };
        case (NetworkActions.FETCH_UNLEARNED_NETWORK):
            return {
                ...state,
                fetchingNetwork: true
            };
        case (NetworkActions.START_LEARNING_NETWORK):
            return {
                ...state,
                fetchingNetwork: false
            };
        case (NetworkActions.END_LEARNING_NETWORK):
            return {
                ...state,
                networkInUsage: action.payload
            };
        case (NetworkActions.FETCH_LEARNED_NETWORK):
            return {
                ...state,
                fetchingNetwork: true
            };
        case (NetworkActions.START_RUNNING_NETWORK):
            return {
                ...state,
                networkInUsage: action.payload,
                fetchingNetwork: false
            };
        case (NetworkActions.RUN_NETWORK):
            return {
                ...state,
                runningNetwork: true
            };
        case (NetworkActions.END_RUNNING_NETWORK):
            return {
                ...state,
                networkRunResult: action.payload,
                runningNetwork: false
            };
        default:
            return state;
    }
}
