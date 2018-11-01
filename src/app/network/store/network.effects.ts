import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {switchMap, withLatestFrom, map, catchError} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';

import * as NetworkActions from './network.actions';
import {UnlearnedNetwork} from '../shared/unlearned-network.model';
import {NetworkOutput} from '../shared/network-output.model';
import {LearnedNetwork} from '../shared/learned-network.model';
import * as fromApp from '../../store/app.reducers';
import {API_URL} from '../network.consts';
import {of} from 'rxjs/observable/of';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {Router} from '@angular/router';
import {Ng2ImgToolsService} from 'ng2-img-tools';
import {LearnedNetworkInfo} from '../shared/learned-network-info.model';
import {SnackBarService, SnackBarType} from '../shared/snack-bar.service';
import {DatasetInfo} from '../shared/dataset-info.model';
import {ModelNetwork} from './network.actions';

@Injectable()
export class NetworkEffects {
    @Effect()
    uploadImage = this.actions$
        .ofType(NetworkActions.INPUT_IMAGE_UPLOAD)
        .pipe(
            switchMap(
                (action: NetworkActions.InputImageUpload) => {
                    const promise = new Promise<string>(
                        (resolve, reject) => {
                            const self = this;
                            const reader = new FileReader();

                            reader.onload = function(e: any) {
                                const src = e.target.result;

                                // Testing img and also preloading
                                const img = new Image();
                                img.src = src;

                                img.onload = function() {
                                    self.ng2ImgToolsService.getEXIFOrientedImage(img).then(
                                        result => {
                                            resolve(result.src);
                                        },
                                        error => {
                                            reject(error);
                                        }
                                    );
                                };

                                img.onerror = function() {
                                    reject('Broken image');
                                };
                            };

                            reader.readAsDataURL(action.payload);
                        }
                    );

                    return fromPromise(promise).pipe(
                        map((result) => new NetworkActions.InputImageUploadSuccess(result)),
                        catchError((error) => {
                            this.defaultErrorStrategy(error);
                            return of(new NetworkActions.EffectError(error));
                        })
                    );
                }
            )
        );

    @Effect()
    modelNetwork = this.actions$
        .ofType(NetworkActions.MODEL_NETWORK)
        .pipe(
            withLatestFrom(this.store.select('network')),
            switchMap(
                ([action, network]) => {
                    const networkInUsage = <UnlearnedNetwork>network.networkInUsage;

                    return this.httpClient.post<{ id: number }>(API_URL + 'model', {
                        name: (<ModelNetwork>action).payload,
                        model_json: {
                            layers: networkInUsage.getRawLayers()
                        },
                    }).pipe(
                        map((result) => new NetworkActions.EndModelingNetwork(result.id)),
                        catchError((error) => {
                            if (error.error && error.error.message) {
                                this.defaultErrorStrategy(error.error.message);
                            }
                            else {
                                this.defaultErrorStrategy(error.message);
                            }
                            return of(new NetworkActions.EffectError(error));
                        })
                    );
                }
            )
        );

    @Effect()
    fetchUnlearnNetwork = this.actions$
        .ofType(NetworkActions.FETCH_UNLEARNED_NETWORK)
        .pipe(
            switchMap(
                (action: NetworkActions.FetchUnlearnedNetwork) => {
                    return this.httpClient.get<any>(API_URL + `model/${action.payload}`).pipe(
                        map((result) => {
                            const unlearnedNetwork = UnlearnedNetwork.fromJSON(result);
                            return new NetworkActions.FetchUnlearnedNetworkSuccess(unlearnedNetwork);
                        }),
                        catchError((error) => {
                            this.defaultErrorStrategy('Model does not exist', true, '/home/models');
                            return of(new NetworkActions.EffectError(error));
                        })
                    );
                }
            ),
        );

    @Effect()
    learnNetwork = this.actions$
        .ofType(NetworkActions.LEARN_NETWORK)
        .pipe(
            withLatestFrom(this.store.select('network')),
            switchMap(
                ([action, network]: [NetworkActions.LearnNetwork, any]) => {
                    return this.httpClient.post<any>(API_URL + `trained_model`, {
                        model_id: action.payload,
                        dataset: network.learnSettings.dataset,
                        name: network.learnSettings.modelName,
                        params: {
                            epochs: network.learnSettings.epochs,
                            batch_size: network.learnSettings.batchSize,
                        },
                    }).pipe(
                        map((result) => {
                            this.snackBarService.open(SnackBarType.SUCCESS,
                                'Model have started learning in the background. You can now look at progress in the trained models list.');
                            return new NetworkActions.EndLearningNetwork(result.id);
                        }),
                        catchError((error) => {
                            this.defaultErrorStrategy(error.message);
                            return of(new NetworkActions.EffectError(error));
                        })
                    );
                }
            )
        );

    @Effect()
    fetchLearnedNetwork = this.actions$
        .ofType(NetworkActions.FETCH_LEARNED_NETWORK)
        .pipe(
            switchMap(
                (action: NetworkActions.FetchLearnedNetwork) => {

                    return this.httpClient.get<any>(API_URL + `trained_model/${action.payload}`).pipe(
                        switchMap((network) => {

                            const modelInfo = LearnedNetworkInfo.fromJSON(network);

                            const learnedNetwork = new LearnedNetwork();

                            learnedNetwork.setModelInfo(modelInfo);

                            return fromPromise(learnedNetwork.loadModel()).pipe(
                                map((result) => new NetworkActions.StartRunningNetwork(result)),
                                catchError((error) => {
                                    this.defaultErrorStrategy('Trained model parse error', true, '/home/trained_models');
                                    return of(new NetworkActions.EffectError(error));
                                })
                            );
                        }),
                        catchError((error) => {
                            this.defaultErrorStrategy('Trained model does not exist', true, '/home/trained_models');
                            return of(new NetworkActions.EffectError(error));
                        })
                    );

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

                    return fromPromise(networkInUsage.run()).pipe(
                        map((result: NetworkOutput) => new NetworkActions.EndRunningNetwork(result)),
                        catchError((error) => {
                            this.defaultErrorStrategy(error);
                            return of(new NetworkActions.EffectError(error));
                        })
                    );
                }
            )
        );

    @Effect()
    fetchDatasets = this.actions$
        .ofType(NetworkActions.FETCH_DATASETS)
        .pipe(
            switchMap(
                (action: NetworkActions.FetchDatasets) => {
                    return this.httpClient.get<any>(API_URL + `data`).pipe(
                        map((result: any) => {
                            const datasets: DatasetInfo[] = result.map((dataset) => DatasetInfo.fromJSON(dataset));

                            return new NetworkActions.FetchDatasetsSuccess(datasets);
                        }),
                        catchError((error) => {
                            this.defaultErrorStrategy(error);
                            return of(new NetworkActions.EffectError(error));
                        })
                    );
                }
            )
        );

    @Effect()
    fetchDataset = this.actions$
        .ofType(NetworkActions.FETCH_DATASET)
        .pipe(
            switchMap(
                (action: NetworkActions.FetchDataset) => {
                    return this.httpClient.get<any>(API_URL + `data/${action.payload}`).pipe(
                        map((result: any) => {
                            return new NetworkActions.FetchDatasetSuccess(DatasetInfo.fromJSON(result));
                        }),
                        catchError((error) => {
                            this.defaultErrorStrategy(error);
                            return of(new NetworkActions.EffectError(error));
                        })
                    );
                }
            )
        );

    @Effect()
    fetchAllUnlearnedNetwork = this.actions$
        .ofType(NetworkActions.FETCH_ALL_UNLEARNED_NETWORKS)
        .pipe(
            switchMap(
                (action: NetworkActions.FetchAllUnlearnedNetworks) => {
                    return this.httpClient.get<any[]>(API_URL + `model`).pipe(
                        map((results) => {
                            const networks = results.map(
                                (network) => {
                                    return UnlearnedNetwork.fromJSON(network);
                                }
                            );

                            return new NetworkActions.FetchAllUnlearnedNetworksSuccess(networks);
                        }),
                        catchError((error) => {
                            this.defaultErrorStrategy(error.message);
                            return of(new NetworkActions.EffectError(error));
                        })
                    );
                }
            )
        );

    @Effect()
    fetchAllLearnedNetwork = this.actions$
        .ofType(NetworkActions.FETCH_ALL_LEARNED_NETWORKS)
        .pipe(
            switchMap(
                (action: NetworkActions.FetchAllLearnedNetworks) => {
                    return this.httpClient.get<any[]>(API_URL + `trained_model`).pipe(
                        map((results) => {
                            const infos = results.map(
                                network => LearnedNetworkInfo.fromJSON(network)
                            );

                            return new NetworkActions.FetchAllLearnedNetworksSuccess(infos);
                        }),
                        catchError((error) => {
                            this.defaultErrorStrategy(error.message);
                            return of(new NetworkActions.EffectError(error));
                        })
                    );
                }
            )
        );

    constructor(private actions$: Actions,
                private httpClient: HttpClient,
                private store: Store<fromApp.AppState>,
                private router: Router,
                private ng2ImgToolsService: Ng2ImgToolsService,
                private snackBarService: SnackBarService
    ) {}

    private defaultErrorStrategy(message, redirect = false, url = '') {
        this.snackBarService.open(SnackBarType.ERROR, message);

        if (redirect) {
            this.router.navigate([url]);
        }
    }
}
