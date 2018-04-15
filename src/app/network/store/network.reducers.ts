import * as NetworkActions from './network.actions';

export interface State {
    inputImage: String;
}

const initialState: State = {
    inputImage: ''
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
        default:
            return state;
    }
}
