import { RouterModule } from '@angular/router';
import { EnvioModule } from './../inicio/envio/envio.module';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    EnvioModule,
    RouterModule
  ]
})
export class SharedModule { }
