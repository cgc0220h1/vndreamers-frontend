import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../service/admin/admin.service';
import {IUser} from '../../../model/User';

@Component({
  selector: 'app-user-doughnut-chart',
  templateUrl: './user-doughnut-chart.component.html',
  styleUrls: ['./user-doughnut-chart.component.scss']
})
export class UserDoughnutChartComponent implements OnInit {
  public doughnutChartLabels = ['Nam', 'Nữ'];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut';
  usersRegistered: IUser[] = [];
  manRegistered: IUser[] = [];
  femaleRegistered: IUser[] = [];
  public chartColors: any[] = [
    {
      backgroundColor: ['#FF7360', '#6FC8CE', '#FAFFF2', '#FFFCC4', '#B9E8E0']
    }];

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.getUsersRegisterToday().subscribe(result => {
        console.log(result);
        this.usersRegistered = result;
      }, error => console.log(error)
      , () => {
        this.manRegistered = this.usersRegistered.filter(current => current.gender === 1);
        this.femaleRegistered = this.usersRegistered.filter(current => current.gender === 2);
        this.doughnutChartData[0] = this.manRegistered.length;
        this.doughnutChartData[1] = this.femaleRegistered.length;
      });
  }

}
