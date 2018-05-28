import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';

import {NetworkModule} from './network/network.module';
import {AppRoutingModule} from './app-routing-module';
import {AppComponent} from './app.component';
import {reducers} from './store/app.reducers';
import {EffectsModule} from '@ngrx/effects';
import {NetworkEffects} from './network/store/network.effects';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToasterModule} from 'angular2-toaster';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NetworkModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([
            NetworkEffects
        ]),
        NgbModule.forRoot(),
        ToasterModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
