import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-select-type',
  templateUrl: './select-type.component.html',
  styleUrls: ['./select-type.component.scss']
})
export class SelectTypeComponent implements OnInit {
  isRangeInputOn = false;
  startDate = new FormControl(Validators.required);
  endDate = new FormControl(Validators.required);
  range = new FormGroup({
    start_date: this.startDate,
    end_date: this.endDate
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
    this.range.markAllAsTouched();
    if (this.range.valid) {
      this.router.navigate(['admin/chart/range'], {
        state: {
          range: this.range.value
        }
      }).then(r => console.log(r));
    }
  }
}
