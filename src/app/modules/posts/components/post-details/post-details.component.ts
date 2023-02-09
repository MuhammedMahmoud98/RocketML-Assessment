import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getSelectedPost } from '../../../../store/selectors/posts.selector';
import { Post } from '../../../../models/post.model';
import { UpdatePostDescription } from '../../../../store/actions/post.action';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  quillData = 'Hello there <b>test</b>';

  activeQuill = false;

  panelOpenState: boolean;

  selectedPost$: Observable<Post>;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.selectPost();
  }

  selectPost(): void {
    this.selectedPost$ = this.store.pipe(select(getSelectedPost));
  }

  setQuillActive(postBody?: string) {
    this.quillData = postBody;
    this.activeQuill = !this.activeQuill;
  }

  resetQuill() {
    this.quillData = '';
  }

  saveUpdatedDescription(postId: number) {
    this.store.dispatch(UpdatePostDescription({
      postId,
      newDescription: this.quillData,
    }));
  }
}
