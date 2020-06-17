import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllPedidoPage } from './all-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: AllPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllPedidoPageRoutingModule {}
