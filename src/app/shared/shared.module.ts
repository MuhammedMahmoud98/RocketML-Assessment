import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import {MaterialApisModule} from "../modules/material-apis/material-apis.module";



@NgModule({
  declarations: [
    LanguageSwitcherComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialApisModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    LanguageSwitcherComponent,
    MaterialApisModule,
  ],
})
export class SharedModule { }
