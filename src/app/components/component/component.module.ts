import { FormsModule } from '@angular/forms';
import { DashboardModule } from './../dashboard/dashboard.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementsComponent } from './increments/increments.component';
import { DonaComponent } from './dona/dona.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [IncrementsComponent, DonaComponent],
  exports: [
    IncrementsComponent,
    DonaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentModule { }
