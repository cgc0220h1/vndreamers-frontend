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

  barChartLabels = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [
    {data: [], label: 'Danh sách người dùng'}
  ];
  barChartColor: any[] = [
    {
      backgroundColor: ['#FF7360', '#6FC8CE', '#FAFFF2', '#FFFCC4', '#B9E8E0']
    }];

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
      this.userList.map(val => {
        val.createdDate = new Date(val.createdDate).toLocaleDateString();
      });
      this.userList.forEach((val) => {
        map[val.createdDate] = map[val.createdDate] || 0;
        map[val.createdDate]++;
      });
      console.log(map);
      const property = [];
      // tslint:disable-next-line:forin
      for (const key in map) {
        this.barChartLabels.push(key);
        this.barChartData[0].data.push(map[key]);
        property.push(key);
      }
    });
  }

}
