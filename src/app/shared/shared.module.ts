import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {SharedRoutingModule} from './shared-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthModule} from '../auth/auth.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbModule,
    AuthModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [NavbarComponent]
})
export class SharedModule { }
