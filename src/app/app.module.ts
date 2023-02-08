import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { globalReducers } from './store/reducers';
import {EffectsModule} from "@ngrx/effects";
import {LoginEffects} from "./store/effects/login.effect";
import {LoginService} from "./services/login.service";
import {SharedModule} from "./shared/shared.module";
import {PostsModule} from "./modules/posts/posts.module";
import {PostsService} from "./services/posts.service";
import {PostsEffect} from "./store/effects/posts.effect";
// handles translation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([PostsEffect]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SharedModule,
    StoreModule.forRoot(globalReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    PostsModule,
  ],
  providers: [PostsService],
  bootstrap: [AppComponent],
})
export class AppModule { }
