import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    PostsComponent,
    PostsListComponent,
  ],
  exports: [
    PostsListComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
  ],
})
export class PostsModule { }
