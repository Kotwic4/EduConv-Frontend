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
import {LearnNetwork} from './network.actions';
import {of} from 'rxjs/observable/of';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';

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
                            const reader = new FileReader();

                            reader.onload = function(e: any) {
                                const src = e.target.result;

                                // Testing img and also preloading
                                const img = new Image();
                                img.src = src;

                                img.onload = function() {
                                    resolve(src);
                                };

                                img.onerror = function() {
                                    reject("Broken image");
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
                    const layers = (<UnlearnedNetwork>network.networkInUsage).getRawLayers();

                    return this.httpClient.post<any>(API_URL + "model", {
                        layers
                    }).pipe(
                        map((result) => new NetworkActions.EndModelingNetwork(result)),
                        catchError((error) => {
                            this.defaultErrorStrategy(error.message);
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
                    return this.httpClient.get<any>(API_URL + `model/${action.payload}/input.json`).pipe(
                        map((result) => new NetworkActions.StartLearningNetwork(result)),
                        catchError((error) => {
                            this.defaultErrorStrategy("Model does not exist", true);
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
            switchMap(
                (action: LearnNetwork) => {
                    return this.httpClient.post<any>(API_URL + `model/${action.payload}/train`, {}).pipe(
                        map(() => new NetworkActions.EndLearningNetwork()),
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
                    const learnedNetwork2 = new LearnedNetwork();
                    learnedNetwork2.id = action.payload;

                    return fromPromise(learnedNetwork2.loadModel()).pipe(
                        map((result) => new NetworkActions.StartRunningNetwork(result)),
                        catchError((error) => {
                            this.defaultErrorStrategy("Network does not exist", true);
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

    constructor(private actions$: Actions,
                private httpClient: HttpClient,
                private store: Store<fromApp.AppState>,
                private router: Router,
                private toasterService: ToasterService,
    ) {}

    private defaultErrorStrategy(message, redirect = false) {
        this.toasterService.pop('error', '', message);

        if (redirect) {
            this.router.navigate(['']);
        }
    }
}
