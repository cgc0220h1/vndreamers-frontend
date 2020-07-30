import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-doughnut-chart',
  templateUrl: './user-doughnut-chart.component.html',
  styleUrls: ['./user-doughnut-chart.component.scss']
})
export class UserDoughnutChartComponent implements OnInit {
  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
  }

}
