import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointOfSaleRoutingModule } from './point-of-sale-routing.module';
import { PointOfSaleComponent } from './point-of-sale.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    PointOfSaleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PointOfSaleRoutingModule,
  ],
})
export class PointOfSaleModule { }
