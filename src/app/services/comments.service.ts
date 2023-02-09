import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comments.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private readonly http: HttpClient) { }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.baseUrl}/${postId}/comments`);
  }
}
