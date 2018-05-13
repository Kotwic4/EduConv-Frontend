import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {switchMap, withLatestFrom, map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';

import * as NetworkActions from './network.actions';
import * as fromNetwork from './network.reducers';
import {Observable} from 'rxjs/Observable';
import {Network} from '../shared/network.model';
import {NetworkOutput} from '../shared/network-output.model';
import {LearnedNetwork} from '../shared/learned-network.model';

@Injectable()
export class NetworkEffects {
    @Effect()
    modelNetwork = this.actions$
        .ofType(NetworkActions.MODEL_NETWORK)
        .pipe(
            withLatestFrom(this.store.select('networkInUsage')),
            switchMap(
                ([action, network]) => {
                    // TODO Wysłanie sieci na serwer
                    return Observable.create(
                        (observer) => {
                            observer.next(
                                new Network()
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

    @Effect()
    learnNetwork = this.actions$
        .ofType(NetworkActions.RUN_NETWORK)
        .pipe(
            withLatestFrom(this.store.select('networkInUsage')),
            switchMap(
                ([action, network]) => {
                    // TODO Wysłanie sieci do nauki na serwer
                    return Observable.create(
                        (observer) => {
                            observer.next(
                                new LearnedNetwork()
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

    constructor(private actions$: Actions,
                private httpClient: HttpClient,
                private store: Store<fromNetwork.State>) {
    }
}
