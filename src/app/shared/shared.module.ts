import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialApisModule } from './material-apis/material-apis.module';
import { TruncatePipe } from './pipes/truncate.pipe';
import { PostsDialogueComponent } from './components/posts-dialogue/posts-dialogue.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { PostsFilterPipe } from './pipes/posts-filter.pipe';
import { CommentsTableComponent } from './components/comments-table/comments-table.component';

@NgModule({
  declarations: [
    TruncatePipe,
    PostsDialogueComponent,
    SnackBarComponent,
    PostsFilterPipe,
    CommentsTableComponent,
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
    MaterialApisModule,
    TruncatePipe,
    PostsDialogueComponent,
    PostsFilterPipe,
    CommentsTableComponent,
  ],
})
export class SharedModule { }
