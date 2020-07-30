import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-select-type',
  templateUrl: './select-type.component.html',
  styleUrls: ['./select-type.component.scss']
})
export class SelectTypeComponent implements OnInit {
  isRangeInputOn = false;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleRangeInput(): void {
    if (this.isRangeInputOn) {
      this.isRangeInputOn = false;
    } else {
      this.isRangeInputOn = true;
    }
  }

  showChartToday(): void {

  }
}
