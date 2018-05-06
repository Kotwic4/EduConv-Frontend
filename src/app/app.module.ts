import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';

import {NetworkModule} from './network/network.module';
import {AppRoutingModule} from './app-routing-module';
import {AppComponent} from './app.component';
import {reducers} from './store/app.reducers';
import {SortablejsModule} from 'angular-sortablejs';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NetworkModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers),
        SortablejsModule.forRoot({animation: 150}),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
