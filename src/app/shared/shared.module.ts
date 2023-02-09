import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { MaterialApisModule } from './material-apis/material-apis.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { PostsDialogueComponent } from './components/posts-dialogue/posts-dialogue.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { PostsFilterPipe } from './pipes/posts-filter.pipe';
import { DeleteDialogeComponent } from './components/delete-dialoge/delete-dialoge.component';
import { CommentsTableComponent } from './components/comments-table/comments-table.component';

@NgModule({
  declarations: [
    LanguageSwitcherComponent,
    NavBarComponent,
    TruncatePipe,
    PostsDialogueComponent,
    SnackBarComponent,
    PostsFilterPipe,
    DeleteDialogeComponent,
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
    LanguageSwitcherComponent,
    MaterialApisModule,
    NavBarComponent,
    TruncatePipe,
    PostsDialogueComponent,
    PostsFilterPipe,
    CommentsTableComponent,
  ],
})
export class SharedModule { }
