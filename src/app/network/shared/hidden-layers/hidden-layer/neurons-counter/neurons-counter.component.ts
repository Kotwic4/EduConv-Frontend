import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-neurons-counter',
    templateUrl: './neurons-counter.component.html',
    styleUrls: ['./neurons-counter.component.scss']
})
export class NeuronsCounterComponent implements OnInit {
    @Output() onChange: EventEmitter<number> = new EventEmitter();
    @Input() value: number;
    private delay = 500;
    private debouncer;

    constructor(private elementRef: ElementRef) {
        const eventStream = Observable.fromEvent(elementRef.nativeElement, 'keyup')
            .map(() => this.value)
            .debounceTime(this.delay)
            .distinctUntilChanged();

        eventStream.subscribe(input => {
            this.onChange.emit(this.value);
        });
    }

    ngOnInit() {
    }

    inc() {
        if (!this.value && this.value !== 0) {
            this.value = 0;
        }
        else {
            this.value++;
        }

        this.emit();
    }

    dec() {
        if (!this.value && this.value !== 0) {
            this.value = 0;
        }
        else {
            this.value--;
        }

        this.emit();
    }

    private emit() {
        if (this.debouncer) {
            clearTimeout(this.debouncer);
        }

        this.debouncer = setTimeout(
            () => {
                this.onChange.emit(this.value);
            },
            this.delay
        );
    }
}
