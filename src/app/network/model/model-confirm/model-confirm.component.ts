import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-model-confirm',
  templateUrl: './model-confirm.component.html',
  styleUrls: ['./model-confirm.component.scss']
})
export class ModelConfirmComponent implements OnInit {

  constructor(
      @Inject(MAT_DIALOG_DATA) public name: String
  ) { }

  ngOnInit() {
  }

}
