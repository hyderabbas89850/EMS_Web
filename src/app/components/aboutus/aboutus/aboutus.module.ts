import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutusRoutingModule } from './aboutus-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus.component';

const routes: Routes = [
  {
    path: 'aboutus',
    component: AboutusComponent,
    data: {
      breadcrumb: []
    }
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AboutusRoutingModule,RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AboutusModule { }
