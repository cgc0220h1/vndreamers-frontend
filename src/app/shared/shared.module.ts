import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {SharedRoutingModule} from './shared-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbModule
  ],
  exports: [NavbarComponent]
})
export class SharedModule { }
