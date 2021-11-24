import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowClassPageRoutingModule } from './show-class-routing.module';

import { ShowClassPage } from './show-class.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowClassPageRoutingModule
  ],
  declarations: [ShowClassPage]
})
export class ShowClassPageModule {}
