import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {switchMap, withLatestFrom, map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';

import * as NetworkActions from './network.actions';;
import {UnlearnedNetwork} from '../shared/unlearned-network.model';
import {NetworkOutput} from '../shared/network-output.model';
import {LearnedNetwork} from '../shared/learned-network.model';
import * as fromApp from '../../store/app.reducers';
import {API_URL} from '../network.consts';
import {LearnNetwork} from './network.actions';

@Injectable()
export class NetworkEffects {
    @Effect()
    modelNetwork = this.actions$
        .ofType(NetworkActions.MODEL_NETWORK)
        .pipe(
            withLatestFrom(this.store.select('network')),
            switchMap(
                ([action, network]) => {
                    const layers = (<UnlearnedNetwork>network.networkInUsage).getRawLayers();

                    return this.httpClient.post<any>(API_URL + "model", {
                        layers
                    });
                }
            ),
            map(
                (result) => {
                    return {
                        type: NetworkActions.END_MODELING_NETWORK,
                        payload: result
                    };
                }
            )
        );

    @Effect()
    fetchUnlearnNetwork = this.actions$
        .ofType(NetworkActions.FETCH_UNLEARNED_NETWORK)
        .pipe(
            switchMap(
                (action: NetworkActions.FetchUnlearnedNetwork) => {
                    return this.httpClient.get<any>(API_URL + `model/${action.payload}/input.json`);
                }
            ),
            map(
                (result) => {
                    return {
                        type: NetworkActions.START_LEARNING_NETWORK,
                        payload: result
                    };
                }
            )
        );

    @Effect()
    learnNetwork = this.actions$
        .ofType(NetworkActions.LEARN_NETWORK)
        .pipe(
            switchMap(
                (action: LearnNetwork) => {
                    return this.httpClient.post<any>(API_URL + `model/${action.payload}/train`, {});
                }
            ),
            map(
                (result) => {
                    return {
                        type: NetworkActions.END_LEARNING_NETWORK,
                        payload: result
                    };
                }
            )
        );

    @Effect()
    fetchLearnedNetwork = this.actions$
        .ofType(NetworkActions.FETCH_LEARNED_NETWORK)
        .pipe(
            switchMap(
                (action: NetworkActions.FetchLearnedNetwork) => {
                    console.log(action.payload);
                    const learnedNetwork2 = new LearnedNetwork();
                    learnedNetwork2.id = action.payload;
                    return learnedNetwork2.loadModel();
                }
            ),
            map(
                (result) => {
                    return {
                        type: NetworkActions.START_RUNNING_NETWORK,
                        payload: result
                    };
                }
            )
        );

    @Effect()
    runNetwork = this.actions$
        .ofType(NetworkActions.RUN_NETWORK)
        .pipe(
            withLatestFrom(this.store.select('network')),
            switchMap(
                ([action, network]) => {
                    const networkInUsage = <LearnedNetwork>network.networkInUsage;
                    return networkInUsage.run().then(
                        (result) => {
                            const output = new NetworkOutput();
                            output.classification = result;
                            return output;
                        }
                    );
                }
            ),
            map(
                (result) => {
                    return {
                        type: NetworkActions.END_RUNNING_NETWORK,
                        payload: result
                    };
                }
            )
        );

    constructor(private actions$: Actions,
                private httpClient: HttpClient,
                private store: Store<fromApp.AppState>
    ) {}
}
