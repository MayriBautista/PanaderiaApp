import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddGastoPageRoutingModule } from './add-gasto-routing.module';

import { AddGastoPage } from './add-gasto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddGastoPageRoutingModule
  ],
  declarations: [AddGastoPage]
})
export class AddGastoPageModule {}
