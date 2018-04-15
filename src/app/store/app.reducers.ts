import { ActionReducerMap } from '@ngrx/store';
import * as fromNetwork from '../network/store/network.reducers';

export interface AppState {
  network: fromNetwork.State;
}

export const reducers: ActionReducerMap<AppState> = {
  network: fromNetwork.networkReducer
};
