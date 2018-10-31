import {Component, Input, Pipe, PipeTransform} from '@angular/core';

@Component({
    selector: 'app-histogram',
    templateUrl: './histogram.component.html',
    styleUrls: ['./histogram.component.scss']
})
export class HistogramComponent {
    @Input() data: {dataX: string[], dataY: number[]};

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
}

@Pipe({name: 'histogramData'})
export class HistogramDataPipe implements PipeTransform {
    transform(data: {dataX: string[], dataY: number[]}): [{data: number[]}] {
        console.log(data.dataX);
        return [{ data: data.dataY}];
    }
}
