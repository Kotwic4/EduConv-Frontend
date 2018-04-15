import * as NetworkActions from './network.actions';

export interface State {
    inputImage: String;
    uploadedNetwork: String;
    labels: String[];
    results: Number[];
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
        default:
            return state;
    }
}
