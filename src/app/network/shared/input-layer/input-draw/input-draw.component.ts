import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import * as Sketch from 'sketch-js';
import {MatDialogRef} from '@angular/material';
import * as NetworkActions from '../../../store/network.actions';

@Component({
  selector: 'app-input-draw',
  templateUrl: './input-draw.component.html',
  styleUrls: ['./input-draw.component.scss']
})
export class InputDrawComponent implements OnInit, AfterViewInit {
    constructor(
        public dialogRef: MatDialogRef<InputDrawComponent>,
        private elementRef: ElementRef
    ) { }

    ngOnInit() {}

    ngAfterViewInit() {
        Sketch.create({
            container: document.getElementById( 'container' ),
            fullscreen: false,
            width: 300,
            height: 300,
            autoclear: false,
            retina: 'auto',
            mousemove: function() {
                if (!this.dragging) {
                    return;
                }

                for ( let i = this.touches.length - 1, touch; i >= 0; i-- ) {

                    touch = this.touches[i];

                    this.lineCap = 'round';
                    this.lineJoin = 'round';
                    this.lineWidth = 20;
                    this.fillStyle = this.strokeStyle = 'white';

                    this.beginPath();
                    this.moveTo( touch.ox, touch.oy );
                    this.lineTo( touch.x, touch.y );
                    this.stroke();
                }
            }
        });
    }

    onSave() {
        const canvas = <HTMLCanvasElement>document.createElement('canvas');
        const sketchCanvas = this.elementRef.nativeElement.querySelector('canvas');
        const context = canvas.getContext('2d');

        canvas.height = 28;
        canvas.width = 28;
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(sketchCanvas, 0, 0, 28, 28);
        const img = canvas.toDataURL();

        this.dialogRef.close(img);
    }
}
