import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminService} from '../../../service/admin/admin.service';
import {IUser} from '../../../model/User';

@Component({
  selector: 'app-user-bar-chart',
  templateUrl: './user-bar-chart.component.html',
  styleUrls: ['./user-bar-chart.component.scss']
})
export class UserBarChartComponent implements OnInit {
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  range: any;
  userList: IUser[] = [];

  barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  constructor(private router: Router,
              private adminService: AdminService) {
    this.range = this.router.getCurrentNavigation().extras.state.range;
  }

  ngOnInit(): void {
    console.log(this.range);
    this.adminService.getUserRegisterByRange(this.range).subscribe(result => {
      this.userList = result;
      console.log(this.userList);
      const map = {};
      this.userList.map(value => {
        value.createdDate = new Date(value.createdDate).toLocaleDateString();
      });
      this.userList.forEach((val) => {
        map[val.createdDate] = map[val.createdDate] || 0;
        map[val.createdDate]++;
      });
      console.log(map);
    });
  }

}
