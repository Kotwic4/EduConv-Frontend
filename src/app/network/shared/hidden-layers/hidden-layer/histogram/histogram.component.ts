import {Component, Input, Pipe, PipeTransform} from '@angular/core';

@Component({
    selector: 'app-histogram',
    templateUrl: './histogram.component.html',
    styleUrls: ['./histogram.component.scss']
})
export class HistogramComponent {
    @Input() data: Map<number, number>;

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = this.generateXAxis();

    generateXAxis() {
        return new Array(101).fill(0).map((value, index) => index + '%');
    }
}

@Pipe({name: 'histogramData'})
export class HistogramDataPipe implements PipeTransform {
    transform(data: Map<number, number>): [{data: number[]}] {
        const formattedData = new Array(101).fill(0).map((value, index) => {
            return data.get(index / 100) || 0;
        });

        return [{ data: formattedData}];
    }
}
