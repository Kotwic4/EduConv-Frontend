import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducers';
import * as NetworkActions from '../../../store/network.actions';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PageEvent} from '@angular/material';
import {DatasetInfo} from '../../../shared/dataset-info.model';

@Component({
    selector: 'app-dataset',
    templateUrl: './dataset.component.html',
    styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent implements OnInit {
    private subscription: Subscription;
    public id: number;
    public dataset: DatasetInfo;
    public images: number[];
    public imagesLoaded: boolean[];

    pageIndex = 0;
    pageSize = 50;
    pageSizeOptions = [50, 100, 200];

    constructor(
        private store: Store<fromApp.AppState>,
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.store.dispatch(new NetworkActions.FetchDataset(this.id));

                this.subscription = this.store.select('network')
                    .subscribe(
                        data => {
                            if (data.dataset) {
                                this.dataset = data.dataset;
                                this.images = new Array(data.dataset.testImagesCount);
                                this.imagesLoaded = new Array(this.pageSize);
                            }
                        }
                    );
            });
    }

    getImageUrl(imageId: number) {
        return `http://127.0.0.1:5000/data/${this.id}/bitmaps/${imageId}`;
    }

    downloadImage(imageId: number) {
        const url = this.getImageUrl(imageId);
        const filename = `image_${this.dataset.name }_${imageId}.jpg`;

        fetch(url, {
            headers: new Headers({
                'Origin': location.origin
            }),
            mode: 'cors'
        })
            .then(response => response.blob())
            .then(blob => {
                const blobUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');

                a.download = filename;
                a.href = blobUrl;
                a.click();
            })
            .catch(e => console.error(e));
    }

    onPage(event: PageEvent) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.setImagesLoading();
    }

    setImagesLoading() {
        this.imagesLoaded = this.imagesLoaded.map(() => false);
    }

    setImageLoaded(index: number) {
        this.imagesLoaded[index] = true;
    }
}
