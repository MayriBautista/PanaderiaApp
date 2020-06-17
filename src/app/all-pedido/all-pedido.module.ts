import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllPedidoPageRoutingModule } from './all-pedido-routing.module';

import { AllPedidoPage } from './all-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllPedidoPageRoutingModule
  ],
  declarations: [AllPedidoPage]
})
export class AllPedidoPageModule {}
