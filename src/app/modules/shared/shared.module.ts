import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmComponent } from './components/confirm/confirm.component';



@NgModule({
  declarations: [
    SidenavComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule
  ],
  exports: [
    SidenavComponent,
    ConfirmComponent
  ]
})
export class SharedModule { }
