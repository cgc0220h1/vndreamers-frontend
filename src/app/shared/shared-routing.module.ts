import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard',     title: 'Vndreamers',         icon: 'nc-bank',       class: '' },
  { path: '/icons',         title: 'Icons',             icon: 'nc-diamond',    class: '' },
  { path: '/maps',          title: 'Maps',              icon: 'nc-pin-3',      class: '' },
  { path: '/notifications', title: 'Notifications',     icon: 'nc-bell-55',    class: '' },
  { path: '',               title: 'User Profile',      icon: 'nc-single-02',  class: '' },
  { path: '/table',         title: 'Table List',        icon: 'nc-tile-56',    class: '' },
  { path: '/typography',    title: 'Typography',        icon: 'nc-caps-small', class: '' },
  { path: '/upgrade',       title: 'Upgrade to PRO',    icon: 'nc-spaceship',  class: 'active-pro' },
];

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
