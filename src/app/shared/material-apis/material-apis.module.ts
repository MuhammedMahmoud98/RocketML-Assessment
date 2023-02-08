import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatRippleModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
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
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatRippleModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [],
})
export class MaterialApisModule { }
