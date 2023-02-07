import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatSidenavModule,
  ],
  exports: [
    MatButtonModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatSidenavModule,
  ],
  providers: [],
})
export class MaterialApisModule { }
