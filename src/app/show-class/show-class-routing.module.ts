import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowClassPage } from './show-class.page';

const routes: Routes = [
  {
    path: '',
    component: ShowClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowClassPageRoutingModule {}
