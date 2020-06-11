import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGastoPage } from './add-gasto.page';

const routes: Routes = [
  {
    path: '',
    component: AddGastoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddGastoPageRoutingModule {}
