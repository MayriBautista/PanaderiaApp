import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeEmpleadoPage } from './home-empleado.page';

const routes: Routes = [
  {
    path: '',
    component: HomeEmpleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeEmpleadoPageRoutingModule {}
