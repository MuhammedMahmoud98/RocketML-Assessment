import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuillModule } from 'ngx-quill';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { SharedModule } from '../../shared/shared.module';
import { PostDetailsComponent } from './components/post-details/post-details.component';

@NgModule({
  declarations: [
    PostsComponent,
    PostsListComponent,
    PostDetailsComponent,
  ],
  exports: [
    PostsListComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    QuillModule.forRoot(),
  ],
})
export class PostsModule { }
