import * as NetworkActions from './network.actions';

export interface State {
  imageUrl: String;
}

const initialState: State = {
  imageUrl: ''
};

export function networkReducer(state = initialState, action: NetworkActions.NetworkActions) {
  switch (action.type) {
    case (NetworkActions.UPLOAD_IMAGE):
      return {
        ...state,
        imageUrl: action.payload
      };
    default:
      return state;
  }
}
