import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {switchMap, withLatestFrom, map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';

import * as NetworkActions from './network.actions';
import * as fromNetwork from './network.reducers';
import {Observable} from 'rxjs/Observable';
import {UnlearnedNetwork} from '../shared/unlearned-network.model';
import {NetworkOutput} from '../shared/network-output.model';
import {LearnedNetwork} from '../shared/learned-network.model';
import {FetchUnlearnedNetwork} from './network.actions';

const unlearnedNetwork = new UnlearnedNetwork();
unlearnedNetwork.id = 1;
unlearnedNetwork.layers = [
    {
        type: 0,
        neurons: 10
    },

    {
        type: 1,
        neurons: 9
    },
];

const learnedNetwork = new LearnedNetwork();
learnedNetwork.id = 1;
learnedNetwork.layers = [
    {
        type: 0,
        neurons: 10
    },

    {
        type: 1,
        neurons: 9
    },
];
learnedNetwork.labels = [
    'label1',
    'label2'
];

@Injectable()
export class NetworkEffects {
    @Effect()
    modelNetwork = this.actions$
        .ofType(NetworkActions.MODEL_NETWORK)
        .pipe(
            withLatestFrom(this.store.select('networkInUsage')),
            switchMap(
                ([action, network]) => {
                    // console.log(network);
                    // TODO Wysłanie sieci na serwer
                    return Observable.create(
                        (observer) => {
                            observer.next(
                                unlearnedNetwork
                            );
                        }
                    );
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
                    // TODO Pobranie niewyuczonej sieci o ID action.payload
                    return Observable.create(
                        (observer) => {
                            observer.next(
                                unlearnedNetwork
                            );
                        }
                    );
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
            withLatestFrom(this.store.select('networkInUsage')),
            switchMap(
                ([action, network]: [NetworkActions.FetchLearnedNetwork, any]) => {
                    // TODO Wysłanie sieci do nauki na serwer
                    return Observable.create(
                        (observer) => {
                            observer.next(
                                learnedNetwork
                            );
                        }
                    );
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
                    // TODO Pobranie wyuczonej sieci o ID action.payload
                    return Observable.create(
                        (observer) => {
                            observer.next(
                                learnedNetwork
                            );
                        }
                    );
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
            withLatestFrom(this.store.select('networkInUsage')),
            switchMap(
                ([action, network]) => {
                    // TODO Asynchroniczne uruchomienie sieci
                    return Observable.create(
                        (observer) => {
                            observer.next(
                                new NetworkOutput()
                            );
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
                private store: Store<fromNetwork.State>) {
    }
}
