import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPost} from '../model/Post';

const API_URL = 'https://vndreamers-dev.herokuapp.com/api/posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(API_URL);
  }
  getById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${API_URL}/${id}`);
  }
  createPost(post: Partial<IPost>): Observable<IPost> {
    return this.http.post<IPost>(API_URL, post);
  }
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
  updatePost(post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${API_URL}/${post.id}`, post);
  }
}
