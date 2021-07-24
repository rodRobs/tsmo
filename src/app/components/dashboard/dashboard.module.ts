import { FormsModule } from '@angular/forms';
import { Error404Component } from './../error404/error404.component';
import { GraphicsComponent } from './../graphics/graphics.component';
import { ProgressComponent } from './../progress/progress.component';
import { ComponentModule } from './../component/component.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraphicsComponent,
    Error404Component
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraphicsComponent,
    Error404Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentModule,
    ChartsModule
  ]
})
export class DashboardModule { }
