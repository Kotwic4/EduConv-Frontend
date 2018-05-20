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
import * as fromApp from '../../store/app.reducers';
import {DenseLayer} from '../shared/hidden-layers/hidden-layer/layers/dense-layer/dense-layer.model';
import {FlattenLayer} from '../shared/hidden-layers/hidden-layer/layers/flatten-layer/flatten-layer.model';
import {DropoutLayer} from '../shared/hidden-layers/hidden-layer/layers/dropout-layer/dropout-layer.model';
import {MaxPooling2DLayer} from '../shared/hidden-layers/hidden-layer/layers/max-pooling2d-layer/max-pooling2d-layer.model';
import {Conv2DLayer} from '../shared/hidden-layers/hidden-layer/layers/conv2d-layer/conv2d-layer.model';

const unlearnedNetwork = new UnlearnedNetwork();
unlearnedNetwork.id = 1;
unlearnedNetwork.layers = [
    new Conv2DLayer(),
    new Conv2DLayer(),
    new DenseLayer(),
    new DropoutLayer(),
    new FlattenLayer(),
    new MaxPooling2DLayer()
];

const learnedNetwork = new LearnedNetwork();
learnedNetwork.id = 1;
learnedNetwork.layers = [
    new Conv2DLayer(),
    new Conv2DLayer(),
    new DenseLayer(),
    new DropoutLayer(),
    new FlattenLayer(),
    new MaxPooling2DLayer()
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
            withLatestFrom(this.store.select('network')),
            switchMap(
                ([action, network]) => {
                    // TODO Wysłanie sieci na serwer
                    const networkInUsage = network.networkInUsage;

                    return Observable.create(
                        (observer) => {
                            observer.next(
                                networkInUsage
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
            withLatestFrom(this.store.select('network')),
            switchMap(
                ([action, network]: [NetworkActions.FetchLearnedNetwork, any]) => {
                    // TODO Wysłanie sieci do nauki na serwer
                    const networkInUsage = network.networkInUsage;
                    console.log(networkInUsage);

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

                    const learnedNetwork2 = new LearnedNetwork();
                    return learnedNetwork2.loadModel();

                    // return Observable.create(
                    //     (observer) => {
                    //         observer.next(
                    //             learnedNetwork
                    //         );
                    //     }
                    // );
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
                    // TODO Asynchroniczne uruchomienie sieci
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
