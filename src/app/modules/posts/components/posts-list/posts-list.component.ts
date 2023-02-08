import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '../../../../models/post.model';
import { PostsDialogueComponent } from '../../../../shared/components/posts-dialogue/posts-dialogue.component';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  @Input() posts: Post[];

  constructor(private readonly dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(mode, post: Partial<Post> = {}) {
    const dialogRef = this.dialog.open(
      PostsDialogueComponent,
      {
        panelClass: 'custom-dialog-container',
        minWidth: 600,
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
}
