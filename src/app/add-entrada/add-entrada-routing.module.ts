import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEntradaPage } from './add-entrada.page';

const routes: Routes = [
  {
    path: '',
    component: AddEntradaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEntradaPageRoutingModule {}
