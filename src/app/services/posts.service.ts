import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddPostPayload, Post, UpdatePostPayload } from '../models/post.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  closeDialog$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  loadPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.baseUrl}`);
  }

  addPost(payload: AddPostPayload): Observable<Post> {
    return this.http.post<Post>(`${environment.baseUrl}`, payload);
  }

  updatePost(payload: UpdatePostPayload): Observable<Post> {
    return this.http.put<Post>(`${environment.baseUrl}/${payload.id}`, payload);
  }

  deletePost(postId: number): Observable<object> {
    return this.http.delete<object>(`${environment.baseUrl}/${postId}`);
  }

  newPostAudio(audioFile = 'new-post.mp3') {
    const audio = new Audio(`./assets/audios/${audioFile}`);
    audio.load();
    audio.play().then();
  }
}
