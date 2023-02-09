import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Post } from '../../../../models/post.model';
import { PostsDialogueComponent } from '../../../../shared/components/posts-dialogue/posts-dialogue.component';
import { DeleteDialogeComponent } from '../../../../shared/components/delete-dialoge/delete-dialoge.component';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  @Input() posts: Post[];

  searchForm: FormGroup;

  constructor(private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.createSearchForm();
  }

  createSearchForm(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }

  get getSearchValue() {
    return this.searchForm.get('search').value;
  }

  openDialog(mode, post: Partial<Post> = {}) {
    const dialogRef = this.dialog.open(
      PostsDialogueComponent,
      {
        panelClass: 'custom-dialog-container',
        width: '600px',
        data: {
          dialogTitle: mode === 'add' ? 'Add post dialog' : 'Edit post dialog',
          mode,
          post,
        },
      },
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  trackByFn(index): number {
    return index;
  }

  deletePost(post: Post, i: number, mode: string = 'delete') {
    const { id, title } = post;
    this.dialog.open(PostsDialogueComponent, {
      panelClass: 'custom-dialog-container',
      width: '600px',
      data: {
        dialogTitle: 'Delete post dialog',
        title,
        id,
        i,
        mode,
      },
    });
  }
}
