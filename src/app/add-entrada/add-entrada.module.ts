import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEntradaPageRoutingModule } from './add-entrada-routing.module';

import { AddEntradaPage } from './add-entrada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEntradaPageRoutingModule
  ],
  declarations: [AddEntradaPage]
})
export class AddEntradaPageModule {}
