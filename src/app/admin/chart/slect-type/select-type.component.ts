import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

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

  constructor(private router: Router) {
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
    this.router.navigateByUrl('admin/chart/today').then(r => console.log(r));
  }

  showChartRange(): void {
    this.router.navigateByUrl('admin/chart/range').then(r => console.log(r));
  }
}
