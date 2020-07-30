import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {IPost} from '../model/Post';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

const apiUrl = environment.apiSource;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${apiUrl}/api/comments/${id}`);
  }

  updatePost(post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${apiUrl}/api/comments/${post.id}`, post);
  }
}
