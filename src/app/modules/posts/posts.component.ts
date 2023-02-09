import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {isCommentsLoadingSelector} from "../../store/selectors/posts.selector";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  isCommentsLoading$: Observable<boolean>;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.selectCommentsLoading();
  }

  selectCommentsLoading(): void {
    this.isCommentsLoading$ = this.store.select(isCommentsLoadingSelector);
  }
}
