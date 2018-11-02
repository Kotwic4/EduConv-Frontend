import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducers';
import * as NetworkActions from '../../../store/network.actions';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatRadioChange, PageEvent} from '@angular/material';
import {DatasetInfo} from '../../../shared/dataset-info.model';
import {API_URL} from '../../../network.consts';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

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
    public imagesAmount: number;
    public imagesLoaded: boolean[];
    public labels: Observable<string>[];
    public imageSetName = 'train';
    public LINKS: any[];

    pageIndex = 0;
    pageSize = 25;
    pageSizeOptions = [25, 50, 100];

    constructor(
        private store: Store<fromApp.AppState>,
        private router: Router,
        private route: ActivatedRoute,
        private http: HttpClient,
        private cd: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.images = [];
                this.imagesLoaded = [];

                this.id = +params['id'];
                this.imageSetName = params['imageSet'];
                this.initLinks(this.id);
                this.store.dispatch(new NetworkActions.FetchDataset(this.id));

                this.subscription = this.store.select('network')
                    .subscribe(
                        data => {
                            if (data.dataset) {
                                this.imagesAmount =
                                    this.imageSetName === 'test' ? data.dataset.testImagesCount : data.dataset.trainImagesCount;
                                this.dataset = data.dataset;
                                this.imagesLoaded = new Array(this.pageSize);
                                this.setImagesLoading();
                                this.images = new Array(this.imagesAmount);
                                this.loadLabels();
                            }
                        }
                    );
            });
    }

    initLinks(id: number) {
        this.LINKS = [
            {
                path: `/home/datasets/${id}/images/train`,
                label: 'Train Images'
            },
            {
                path: `/home/datasets/${id}/images/test`,
                label: 'Test Images'
            },
            {
                path: `/home/datasets/${id}/info`,
                label: 'Info'
            }
        ];
    }

    getImageUrl(imageId: number) {
        return `${API_URL}data/${this.id}/bitmaps/${imageId}?imageset=${this.imageSetName}`;
    }

    getLabelUrl(imageId: number) {
        return `${API_URL}data/${this.id}/label/${imageId}?imageset=${this.imageSetName}`;
    }

    downloadImage(imageId: number) {
        const url = this.getImageUrl(imageId);
        const filename = `image_${this.dataset.name }_${imageId}.bmp`;

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
        this.images = [];
        this.cd.detectChanges();
        this.images = new Array(this.imagesAmount);

        this.imagesLoaded = new Array(event.pageSize);
        this.setImagesLoading();
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadLabels();
    }

    loadLabels() {
        const labels = [];

        for (let i = 0; i < this.pageSize; i++) {
            labels.push(
                this.http.get<{label: string}>(this.getLabelUrl(this.pageIndex * this.pageSize + i)).map((res) => res.label)
            );
        }

        this.labels = labels;
    }

    setImagesLoading() {
        this.imagesLoaded = this.imagesLoaded.map(() => false);
    }

    setImageLoaded(index: number) {
        this.imagesLoaded[index] = true;
    }
}
